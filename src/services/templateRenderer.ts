import Handlebars from 'handlebars';
import { TemplateVersion } from '@prisma/client';
import { z } from 'zod';
import { PlaceholderLegend, PlaceholderLegendItem } from '../types/placeholderLegend';

const helperNames = new Set(['if', 'each', 'unless', 'with', 'formatDate', 'formatMoney', 'titleCase', 'upper', 'lower', 'joinList']);

Handlebars.registerHelper('formatDate', (value: any, locale = 'en-GB') => {
  try {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
});

Handlebars.registerHelper('formatMoney', (amount: any, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined || isNaN(Number(amount))) return '';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(amount));
});

Handlebars.registerHelper('titleCase', (str: any) => {
  if (typeof str !== 'string') return '';
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
});

Handlebars.registerHelper('upper', (str: any) => (typeof str === 'string' ? str.toUpperCase() : ''));
Handlebars.registerHelper('lower', (str: any) => (typeof str === 'string' ? str.toLowerCase() : ''));
Handlebars.registerHelper('joinList', (arr: any, separator = ', ') => {
  if (!Array.isArray(arr)) return '';
  return arr.join(separator);
});

type ValidationIssue = { path: string; label?: string; message: string; type: 'unknown' | 'missing' | 'invalid' };
type ValidationResult = {
  issues: ValidationIssue[];
  legend?: PlaceholderLegend;
  placeholders?: string[];
};

const collectPlaceholders = (node: any, acc: Set<string>) => {
  if (!node) return;
  const visitArray = (items?: any[]) => items?.forEach((n) => collectPlaceholders(n, acc));

  switch (node.type) {
    case 'Program':
      visitArray(node.body);
      break;
    case 'MustacheStatement':
    case 'BlockStatement':
    case 'PartialStatement':
    case 'PartialBlockStatement': {
      const orig = node.path?.original;
      if (orig && typeof orig === 'string' && !helperNames.has(orig)) {
        acc.add(orig);
      }
      visitArray(node.params);
      visitArray(node.hash?.pairs?.map((p: any) => p.value));
      if (node.program) collectPlaceholders(node.program, acc);
      if (node.inverse) collectPlaceholders(node.inverse, acc);
      break;
    }
    case 'SubExpression': {
      const orig = node.path?.original;
      if (orig && typeof orig === 'string' && !helperNames.has(orig)) {
        acc.add(orig);
      }
      visitArray(node.params);
      visitArray(node.hash?.pairs?.map((p: any) => p.value));
      break;
    }
    default:
      if (Array.isArray((node as any).body)) visitArray((node as any).body);
      break;
  }
};

export const extractPlaceholders = (template: string): string[] => {
  const ast = Handlebars.parse(template);
  const set = new Set<string>();
  collectPlaceholders(ast, set);
  return Array.from(set);
};

const legendSchema = z.object({
  version: z.literal(1),
  items: z
    .array(
      z.object({
        path: z.string().min(1),
        label: z.string().min(1),
        type: z.union([
          z.literal('string'),
          z.literal('text'),
          z.literal('email'),
          z.literal('phone'),
          z.literal('date'),
          z.literal('money'),
          z.literal('number'),
          z.literal('boolean'),
          z.literal('enum'),
          z.literal('address'),
          z.literal('list_string'),
          z.literal('list_object'),
          z.literal('object'),
        ]),
        required: z.boolean().optional(),
        example: z.any().optional(),
        description: z.string().optional(),
        rules: z
          .object({
            minLength: z.number().optional(),
            maxLength: z.number().optional(),
            pattern: z.string().optional(),
            min: z.number().optional(),
            max: z.number().optional(),
            options: z.array(z.string()).optional(),
          })
          .optional(),
        conditional: z
          .object({
            dependsOn: z.string(),
            equals: z.any().optional(),
            anyOf: z.array(z.any()).optional(),
            truthy: z.boolean().optional(),
          })
          .optional(),
      })
    )
    .min(1),
});

const isValidPath = (path: string) => /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*$/.test(path);

const getValueByPath = (obj: any, path: string) => {
  // Nested lookup: obj.party.controller.name
  const nested = path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  if (nested !== undefined) return nested;
  // Flat-key fallback: obj['party.controller.name']
  return obj[path];
};

export const normalizeLegend = (raw: any): PlaceholderLegend => {
  if (!raw || typeof raw !== 'object') return { version: 1, items: [] };
  const maybeItems = (raw as any).items;
  if (!Array.isArray(maybeItems)) return { version: 1, items: [] };
  return { version: (raw as any).version || 1, items: maybeItems };
};

export const parseLegend = (legendRaw: any): PlaceholderLegend => {
  const parsed = legendSchema.safeParse(legendRaw);
  if (!parsed.success) {
    throw new Error('Invalid placeholderLegend schema');
  }
  return parsed.data;
};

export const validateTemplateVersion = (
  version: TemplateVersion,
  payload: Record<string, any> = {}
): ValidationResult => {
  if (!version.placeholderLegend) {
    return { issues: [{ path: '', message: 'Template missing legend', type: 'invalid' }] };
  }

  let legend: PlaceholderLegend;
  try {
    legend = parseLegend(version.placeholderLegend);
  } catch (err: any) {
    const normalized = normalizeLegend(version.placeholderLegend);
    if (!normalized.items.length) {
      return {
        issues: [
          {
            path: '',
            message: 'Template intake fields are not configured yet.',
            type: 'invalid',
          },
        ],
      };
    }
    return { issues: [{ path: '', message: err.message || 'Invalid legend', type: 'invalid' }] };
  }

  if (!legend.items.length) {
    return {
      issues: [
        {
          path: '',
          message: 'Template intake fields are not configured yet.',
          type: 'invalid',
        },
      ],
      legend,
    };
  }

  const placeholders = extractPlaceholders(version.bodyTemplate || '');
  const allowedPaths = new Map<string, PlaceholderLegendItem>();
  legend.items.forEach((item) => allowedPaths.set(item.path, item));

  const issues: ValidationIssue[] = [];

  placeholders.forEach((ph) => {
    if (!isValidPath(ph)) {
      issues.push({ path: ph, message: 'Invalid placeholder path format (use dot-paths only)', type: 'invalid' });
    } else if (!allowedPaths.has(ph)) {
      issues.push({ path: ph, message: 'Unknown placeholder (not in legend)', type: 'unknown' });
    }
  });

  legend.items.forEach((item) => {
    const val = getValueByPath(payload, item.path);
    const requiredMissing =
      item.required &&
      (val === undefined ||
        val === null ||
        (typeof val === 'string' && val.trim() === '') ||
        (Array.isArray(val) && val.length === 0));
    if (requiredMissing) {
      issues.push({ path: item.path, label: item.label, message: 'Required field missing', type: 'missing' });
    }
  });

  return { issues, legend, placeholders };
};

export const renderTemplateVersion = (version: TemplateVersion, payload: Record<string, any>) => {
  const validation = validateTemplateVersion(version, payload);
  if (validation.issues.length) {
    const err = new Error('Validation failed');
    (err as any).validation = validation;
    throw err;
  }

  const template = Handlebars.compile(version.bodyTemplate || '', { strict: true });
  const rendered = template(payload);
  return { rendered, validation };
};
