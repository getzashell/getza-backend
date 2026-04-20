import fs from 'fs';
import path from 'path';

type ComplianceBlock = {
  mustInclude: string[];
  mustNotInclude: string[];
  notes?: string;
};

export type ComplianceTemplate = {
  id: number;
  templateName: string;
  jurisdictions: {
    UK?: ComplianceBlock;
    US?: ComplianceBlock;
    EU?: ComplianceBlock;
  };
};

export type ComplianceData = {
  global: { mustInclude: string[]; mustNotInclude: string[] };
  templates: ComplianceTemplate[];
};

let cached: ComplianceData | null = null;

const defaultCompliance = (): ComplianceData => ({
  global: { mustInclude: [], mustNotInclude: [] },
  templates: [],
});

const normalizeLine = (line: string) => line.trim();

const parseInlineList = (line: string, prefix: string) => {
  const content = line.slice(prefix.length).trim();
  if (!content) return [];
  return content
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const ensureBlock = (block?: ComplianceBlock): ComplianceBlock => ({
  mustInclude: block?.mustInclude || [],
  mustNotInclude: block?.mustNotInclude || [],
  notes: block?.notes,
});

const resolveCompliancePath = () => {
  if (process.env.COMPLIANCE_PATH) {
    return path.resolve(process.cwd(), process.env.COMPLIANCE_PATH);
  }
  const candidateA = path.resolve(process.cwd(), 'src', 'compliance', 'compliance.md');
  if (fs.existsSync(candidateA)) return candidateA;
  const candidateB = path.resolve(process.cwd(), 'compliance.md');
  return candidateB;
};

export const loadCompliance = (): ComplianceData => {
  if (cached) return cached;
  const mdPath = resolveCompliancePath();
  try {
    console.log('[compliance] loading from', mdPath);
    const raw = fs.readFileSync(mdPath, 'utf-8');
    const lines = raw.split('\n').map(normalizeLine);

    const globalInclude: string[] = [];
    const globalNot: string[] = [];
    const templates: ComplianceTemplate[] = [];

    let mode: 'global' | 'templates' = 'global';
    let currentTemplate: ComplianceTemplate | null = null;
    let currentJurisdiction: 'UK' | 'US' | 'EU' | null = null;
    let currentSection: 'mustInclude' | 'mustNotInclude' | null = null;

    const pushGlobal = (line: string) => {
      if (!line) return;
      const normalized = line.replace(/^[-*]\s*/, '').trim();
      if (!normalized) return;
      if (currentSection === 'mustInclude') globalInclude.push(normalized);
      if (currentSection === 'mustNotInclude') globalNot.push(normalized);
    };

    const pushTemplate = (line: string) => {
      if (!currentTemplate || !currentJurisdiction || !currentSection) return;
      const normalized = line.replace(/^[-*]\s*/, '').trim();
      if (!normalized) return;
      const block = currentTemplate.jurisdictions[currentJurisdiction] || { mustInclude: [], mustNotInclude: [] };
      block[currentSection].push(normalized);
      currentTemplate.jurisdictions[currentJurisdiction] = block;
    };

    for (const rawLine of lines) {
      const line = normalizeLine(rawLine);
      if (!line) continue;

      if (/^template-by-template/i.test(line)) {
        mode = 'templates';
        currentSection = null;
        continue;
      }

      if (mode === 'global') {
        const lower = line.toLowerCase();
        if (lower.startsWith('must include:')) {
          globalInclude.push(...parseInlineList(line, 'must include:'));
          currentSection = null;
          continue;
        }
        if (lower.startsWith('must not include:') || lower.startsWith('must not:')) {
          const prefix = lower.startsWith('must not include:') ? 'must not include:' : 'must not:';
          globalNot.push(...parseInlineList(line, prefix));
          currentSection = null;
          continue;
        }
        if (/^must include$/i.test(line)) {
          currentSection = 'mustInclude';
          continue;
        }
        if (/^must not include$/i.test(line) || /^must not$/i.test(line)) {
          currentSection = 'mustNotInclude';
          continue;
        }
        if (currentSection) {
          pushGlobal(line);
        }
        continue;
      }

      const templateMatch = line.match(/^(\d+)\)\s*(.+)$/);
      if (templateMatch) {
        if (currentTemplate) templates.push(currentTemplate);
        currentTemplate = {
          id: Number(templateMatch[1]),
          templateName: templateMatch[2].trim(),
          jurisdictions: {},
        };
        currentJurisdiction = null;
        currentSection = null;
        continue;
      }

      const jurInclude = line.match(/^(UK|US|EU)\s+must\s+include$/i);
      const jurNot = line.match(/^(UK|US|EU)\s+must\s+not(?:\s+include)?$/i);
      if (jurInclude || jurNot) {
        currentJurisdiction = (jurInclude ? jurInclude[1] : jurNot![1]).toUpperCase() as 'UK' | 'US' | 'EU';
        if (currentTemplate && !currentTemplate.jurisdictions[currentJurisdiction]) {
          currentTemplate.jurisdictions[currentJurisdiction] = { mustInclude: [], mustNotInclude: [] };
        }
        currentSection = jurInclude ? 'mustInclude' : 'mustNotInclude';
        continue;
      }

      const lower = line.toLowerCase();
      if (currentTemplate && currentJurisdiction) {
        if (currentSection) {
          pushTemplate(line);
          continue;
        }
        if (lower.startsWith('must include:')) {
          const block = currentTemplate.jurisdictions[currentJurisdiction] || { mustInclude: [], mustNotInclude: [] };
          block.mustInclude.push(...parseInlineList(line, 'must include:'));
          currentTemplate.jurisdictions[currentJurisdiction] = block;
          continue;
        }
        if (lower.startsWith('must not include:') || lower.startsWith('must not:')) {
          const block = currentTemplate.jurisdictions[currentJurisdiction] || { mustInclude: [], mustNotInclude: [] };
          const prefix = lower.startsWith('must not include:') ? 'must not include:' : 'must not:';
          block.mustNotInclude.push(...parseInlineList(line, prefix));
          currentTemplate.jurisdictions[currentJurisdiction] = block;
          continue;
        }
      }
    }

    if (currentTemplate) templates.push(currentTemplate);

    cached = {
      global: { mustInclude: globalInclude, mustNotInclude: globalNot },
      templates: templates.map((t) => ({
        ...t,
        jurisdictions: {
          UK: ensureBlock(t.jurisdictions.UK),
          US: ensureBlock(t.jurisdictions.US),
          EU: ensureBlock(t.jurisdictions.EU),
        },
      })),
    };
    return cached;
  } catch (err) {
    console.error('[compliance] failed to load compliance.md — continuing without compliance rules');
    cached = defaultCompliance();
    return cached;
  }
};

export const getGlobalCompliance = () => loadCompliance().global;

export const getTemplateComplianceByNumber = (id: number) => loadCompliance().templates.find((t) => t.id === id);

export const findTemplateComplianceByName = (name: string) => {
  const target = name.toLowerCase();
  return loadCompliance().templates.find((t) => t.templateName.toLowerCase().includes(target));
};

export const getComplianceForProductOrTemplate = (opts: { productTitle?: string; templateName?: string; jurisdiction?: 'UK' | 'US' | 'EU' }) => {
  const { productTitle, templateName, jurisdiction } = opts;
  const data = loadCompliance();
  const tryName = (n?: string) => (n ? findTemplateComplianceByName(n) : undefined);
  const match = tryName(templateName) || tryName(productTitle);
  if (!match) return { match: { method: 'none' as const }, compliance: null };
  const block = jurisdiction ? match.jurisdictions[jurisdiction] : null;
  return {
    match: { method: 'fuzzy' as const, matchedTemplateId: match.id, matchedName: match.templateName },
    compliance: block ? { ...block, jurisdiction, id: match.id, templateName: match.templateName } : null,
  };
};
