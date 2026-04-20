import { loadCompliance } from '../src/compliance/complianceLoader';

const data = loadCompliance();
const first = data.templates[0];
console.log('Global include count:', data.global.mustInclude.length);
console.log('Global not count:', data.global.mustNotInclude.length);
console.log('Templates:', data.templates.length);
console.log('Template 1 UK include count:', first?.jurisdictions?.UK?.mustInclude?.length || 0);
