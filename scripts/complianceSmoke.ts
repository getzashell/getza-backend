import { loadCompliance, getGlobalCompliance, getTemplateComplianceByNumber } from '../src/compliance/complianceLoader';

const data = loadCompliance();
console.log('Templates parsed:', data.templates.length);
console.log('Global must include:', getGlobalCompliance().mustInclude.slice(0, 5));
const t1 = getTemplateComplianceByNumber(1);
console.log('Template 1:', t1?.templateName, 'UK include:', t1?.jurisdictions.UK?.mustInclude.slice(0, 3));
