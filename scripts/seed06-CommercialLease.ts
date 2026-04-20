import { ProductStatus, ProductType, OutputFormat, PrismaClient } from '@prisma/client';
import { validateTemplateVersion } from '../src/services/templateRenderer';
const prisma = new PrismaClient();

type LegendItem = { path: string; label: string; type: string; required?: boolean; example?: any; rules?: { options?: string[] } };
const buildLegend = (items: LegendItem[]) => ({ version: 1, items });
const payload = (items: LegendItem[]): Record<string, any> => {
  const p: Record<string, any> = {};
  items.forEach(i => { (p as any)[i.path] = i.example ?? (i.type === 'number' ? 1 : 'Example'); });
  return p;
};

// ─── COMMERCIAL LEASE — UK ───────────────────────────────────────────────────

const LEASE_UK = `COMMERCIAL LEASE

Title: Commercial Lease
Version: 1
Jurisdiction: United Kingdom (England & Wales)

Date: [{{dates.leaseDate}}]

TENANCY AGREEMENT

BETWEEN:

(1) [{{party.landlord.name}}], [{{party.landlord.entityType}}] whose registered office is at [{{party.landlord.registeredAddress}}] (the "Landlord"); and

(2) [{{party.tenant.name}}], [{{party.tenant.entityType}}] whose registered office is at [{{party.tenant.registeredAddress}}] (the "Tenant").

(collectively referred to as "the Parties")

RECITALS

WHEREAS the Landlord is the registered proprietor of the Property described in the Schedule and is entitled to grant this Lease; and

WHEREAS the Tenant has agreed to take this Lease of the Property for the Term and at the Rent and on the covenants and conditions hereinafter contained;

NOW THIS DEED WITNESSES as follows:

1. DEFINITIONS AND INTERPRETATION

1.1 In this Lease, unless the context otherwise requires:

(a) "Building" means [{{property.buildingDescription}}];

(b) "Break Date" means [{{terms.breakDate}}];

(c) "Break Notice" means a notice in the form specified in Schedule [{{terms.breakNoticeSchedule}}] served in accordance with Clause [{{terms.breakClauseReference}}];

(d) "Collateral Warranties" means the warranties to be provided by the Tenant's Contractor and any relevant sub-contractor pursuant to Clause [{{terms.contractorWarrantyClause}}];

(e) "Commencement Date" means [{{terms.commencementDate}}];

(f) " EPC" means the Energy Performance Certificate for the Property [{{property.epcRating}}];

(g) "Essential Terms" means Clauses [{{terms.essentialTermsClauseReferences}}];

(h) "Fixtures and Fittings" means the items specified in Schedule [{{property.fixturesSchedule}}];

(i) "Permitted Use" means [{{property.permittedUse}}];

(j) "Property" means the property more particularly described in the Schedule, being the [{{property.propertyType}}] on [{{property.floorLevel}}] at [{{property.buildingAddress}}];

(k) "Rent" means GBP [{{rent.annualRent}}].00 per annum, payable in advance in equal quarterly instalments on the usual quarter days (or pro rata for any period of less than a quarter), less any deduction required by law;

(l) "Rent Deposit" means the sum of GBP [{{rent.depositAmount}}] to be deposited by the Tenant with the Landlord pursuant to Clause [{{rent.depositClauseReference}}];

(m) "Schedule" means the Schedule to this Lease;

(n) "Service Charge" means the Tenant's proportionate share of the Landlord's costs and expenses incurred in connection with the provision of Services, as more particularly described in Schedule [{{rent.serviceChargeSchedule}}];

(o) "Services" means the services to be provided by the Landlord at the Building as described in Schedule [{{rent.servicesSchedule}}];

(p) "Term" means the term of [{{terms.termYears}}] years commencing on the Commencement Date and ending on [{{terms.termEndDate}}], unless sooner determined in accordance with this Lease;

(q) "VAT" means value added tax chargeable under the Value Added Tax Act 1994;

(r) "year" means a calendar year.

1.2 In this Lease: (i) "including" means "including without limitation"; (ii) obligations imposed on the Tenant include obligations on the Tenant's sub-tenants and assigns where applicable; (iii) obligations imposed on the Landlord run with the Property; (iv) references to an Act of Parliament include any amendment, extension, or re-enactment thereof.

1.3 The Schedules form part of this Lease.

2. DEMISE

2.1 The Landlord hereby demises the Property to the Tenant for the Term, reserving the Rent, together with all rights and easements, and subject to all exceptions and reservations, specified in this Lease.

2.2 The Tenant Paying the Rent and performing the covenants hereinafter contained shall quietly enjoy the Property during the Term without any interruption by the Landlord or any person claiming under the Landlord.

3. RENT

3.1 The Tenant shall pay the Rent by bank standing order to the account nominated by the Landlord, without any deduction or set-off (other than as required by law).

3.2 The first instalment of Rent, being [{{rent.firstQuarterRent}}], proportionate rent for the period from the Commencement Date to the next following quarter day, shall be payable on the execution of this Lease.

3.3 If the Rent or any part thereof remains unpaid for more than [{{rent.gracePeriodDays}}] days after it becomes due (whether formally demanded or not), the Landlord may charge interest on the unpaid amount at the rate of [{{rent.interestRateAboveBase}}]% per annum above the Bank of England base rate from time to time, from the date on which it became due until actual payment.

3.4 The Tenant shall also pay, in addition to the Rent: (a) the Service Charge; (b) all utility charges for the Property; (c) all rates, taxes, and assessments payable in respect of the Property (excluding any tax attributable to the Landlord's rental income); (d) VAT where applicable.

3.5 The Rent shall be reviewed in accordance with Schedule [{{rent.rentReviewSchedule}}].

4. RENT DEPOSIT

4.1 The Tenant shall pay the Rent Deposit to the Landlord on the execution of this Lease.

4.2 The Landlord shall hold the Rent Deposit as security for the performance of the Tenant's covenants and obligations under this Lease. The Landlord may deduct from the Rent Deposit any sums properly due but unpaid, including any damages for breach of covenant.

4.3 Interest on the Rent Deposit shall be credited to the Tenant at [{{rent.depositInterestRate}}]% per annum (or such other rate as the Parties may agree in writing), credited to the Rent Deposit.

4.4 If the Rent Deposit is applied by the Landlord pursuant to Clause 4.2, the Tenant shall, within [{{rent.depositTopUpDays}}] days of written demand, replenish the Rent Deposit to the full amount.

4.5 On the expiry of the Term, the Landlord shall return the Rent Deposit (less any deductions made in accordance with Clause 4.2) within [{{rent.depositReturnDays}}] days of the Tenant vacating the Property and confirming in writing that all the Tenant's obligations have been performed.

5. TENANT'S COVENANTS

The Tenant hereby covenants with the Landlord as follows:

5.1 Rent and Outgoings. To pay the Rent and all other sums reserved by or payable under this Lease at the times and in the manner specified, without any deduction or set-off.

5.2 Repair and Maintenance. To keep the Property in good and substantial repair and condition during the Term (fair wear and tear and damage by insureds risks excepted), including without limitation: (a) all walls, floors, ceilings, windows, doors, and glazing; (b) all fixtures and fittings; (c) all Landlord's plant, machinery, and equipment serving the Property; (d) all installations, pipes, wires, and ducts serving the Property. The Tenant shall decorate the Property in every [{{obligations.decorationCycleYears}}] year of the Term (or as required by the Landlord's reasonable requirements).

5.3 Use. To use the Property only for the Permitted Use and not to: (a) change the permitted use without the Landlord's prior written consent; (b) use the Property for any purpose that is a nuisance or annoyance to neighbouring occupiers or that may increase the Landlord's insurance premiums; (c) overload any floor, structure, or service installation of the Building; (d) store any hazardous, explosive, or combustible materials at the Property.

5.4 Access for Inspection and Repair. To permit the Landlord and the Landlord's agents to enter the Property at any reasonable time upon not less than [{{obligations.inspectionNoticeHours}}] hours' prior written notice (or immediately in case of emergency) to: (a) inspect the condition of the Property; (b) carry out any repairs or maintenance to the Property or the Building; (c) comply with any statutory obligation of the Landlord.

5.5 Compliance with Laws. To comply with all applicable statutes, regulations, by-laws, and other legal requirements relevant to the Tenant's use of the Property, including without limitation the Regulatory Reform (Fire Safety) Order 2005, the Electricity at Work Regulations 1989, and the Noise at Work Regulations 2005.

5.6 Alterations and Improvements. Not to make any structural or exterior alterations to the Property, or any alterations that affect the Building's mechanical, electrical, or plumbing systems, without the Landlord's prior written consent. The Tenant may carry out non-structural interior alterations and fit-out works without consent, provided the Tenant: (a) notifies the Landlord in writing at least [{{obligations.alterationNoticePeriodDays}}] days before commencement; (b) complies with all applicable building regulations and other legal requirements; (c) uses appropriately qualified contractors; (d) restores any altered areas to their original condition upon termination of the Lease if required by the Landlord.

5.7 Signs and Advertising. Not to erect, display, or alter any sign, advertisement, or notice at the Property or the Building without the Landlord's prior written consent. The Tenant shall be permitted to display the Tenant's trading name and logo at the entrance to the Property in accordance with the Landlord's signage policy.

5.8 Assignment and Sub-letting. Not to assign, charge, underlet, or part with possession of the whole or any part of the Property without the Landlord's prior written consent (not to be unreasonably withheld). Any permitted assignment shall be on the condition that the assignee enters into a deed of covenant with the Landlord in the Landlord's prescribed form.

5.9 Insurance. To maintain public liability insurance with a limit of not less than [{{obligations.publicLiabilityMinimum}}] GBP per claim in relation to the Property and to provide evidence of such insurance to the Landlord upon request.

5.10 Return of Property. At the end of the Term: (a) to yield up the Property in the condition required by Clause 5.2; (b) to remove all the Tenant's belongings and trade fixtures; (c) to reinstate any alterations made by the Tenant if required by the Landlord; (d) to return all keys and access devices to the Landlord.

5.11 Information and Statutory Requirements. To provide the Landlord with: (a) copies of all certificates, licences, and permits required for the Tenant's use of the Property within [{{obligations.certCopyDays}}] days of request; (b) details of any hazardous substances stored or used at the Property upon request.

5.12 Landlord's Costs. To reimburse the Landlord on demand for all reasonable costs and expenses (including legal costs and surveyor's fees) incurred by the Landlord in connection with: (a) any breach by the Tenant of the Tenant's covenants; (b) any application by the Tenant for consent where such consent is required under this Lease; (c) the preparation and service of any notice under section 146 of the Law of Property Act 1925 (even if such notice does not result in a forfeiture).

5.13 Encroachments and Notifications. To notify the Landlord promptly of any encroachment made or threatened against the Property, or of any licence or concession granted or proposed in respect of any part of the Building, or of any cancellation or modification threatened to any right of light or other easement enjoyed by the Property.

6. LANDLORD'S COVENANTS

The Landlord hereby covenants with the Tenant as follows:

6.1 Quiet Enjoyment. That the Tenant shall have quiet possession of the Property during the Term without any interruption by the Landlord or any person claiming under the Landlord.

6.2 Insurance. To keep the Building (excluding the Tenant's fixtures, fittings, and belongings) insured against damage or destruction by risks normally insured against in the full reinstatement value of the Building (including architects' and surveyors' fees, and applicable VAT), and to apply any insurance money received in respect of damage to the Building in rebuilding or reinstating the Building.

6.3 Services. To use reasonable endeavours to provide the Services during the Term, subject to Clause [{{landlord.servicesInterruptionClause}}].

6.4 Repair of Structure and Exterior. To keep the structure, exterior, and common parts of the Building in good and substantial repair and condition, subject to the Tenant paying the Service Charge.

6.5 Compliance. To ensure that, at the commencement of the Term, the Landlord has obtained all necessary statutory approvals and licences for the Tenant's use of the Property for the Permitted Use, and to notify the Tenant of any known material non-compliance.

7. BREAK OPTION

[{{terms.breakOptionText}}]

8. RENT REVIEW

[{{terms.rentReviewText}}]

9. DEFAULT AND FORFEITURE

9.1 If the Tenant fails to pay the Rent or any part thereof within [{{default.gracePeriodDays}}] days after the due date, or commits any breach of the Tenant's covenants for which the Landlord has given written notice requiring remedy (and the breach is capable of remedy), and fails to remedy it within [{{default.remedyPeriodDays}}] days of such notice, the Landlord may re-enter the Property and thereupon the Term shall cease, but without prejudice to any right of action of the Landlord in respect of any antecedent breach.

9.2 The Landlord shall not be entitled to exercise the right of re-entry under Clause 9.1 unless the Landlord has given the Tenant's mortgagee (if any) the opportunity to remedy the breach, where the Tenant's mortgagee has registered a notice of charge at HM Land Registry.

10. SECURITY OF TENURE

10.1 The Parties agree that this Lease is excluded from the security of tenure provisions of the Landlord and Tenant Act 1954 (Part II) by virtue of a valid notice and declaration served in accordance with section 38A of that Act.

10.2 [{{terms.securityOfTenureText}}]

11. MISCELLANEOUS

11.1 Notices. All notices and other documents under this Lease shall be in writing and served by personal delivery, pre-paid post, or email to the addresses specified in this Lease (or as updated in writing). Notices sent by post shall be deemed served on the second business day after posting.

11.2 Entire Agreement. This Lease, together with the Schedules, constitutes the entire agreement between the Parties.

11.3 Amendment. No amendment to this Lease shall be effective unless agreed in writing signed by both Parties.

11.4 Severability. If any provision is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

11.5 Governing Law and Jurisdiction. This Lease shall be governed by and construed in accordance with the laws of England and Wales, and the Parties submit to the exclusive jurisdiction of the courts of England and Wales.

11.6 Counterparts. This Lease may be executed in counterparts, each of which shall constitute an original.

IN WITNESS WHEREOF the Parties have executed this Lease as a deed on the date first written above.

EXECUTED as a DEED by [{{party.landlord.name}}]
by [{{signatures.landlordSignatoryName}}], [{{signatures.landlordSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.leaseDate}}]

EXECUTED as a DEED by [{{party.tenant.name}}]
by [{{signatures.tenantSignatoryName}}], [{{signatures.tenantSignatoryTitle}}]:

Signature: _______________________________
Date: [{{dates.leaseDate}}]

THE SCHEDULE

Property Description: [{{property.fullDescription}}]

 EPC Rating: [{{property.epcRating}}]
 EPC Certificate: [{{property.epcCertificateNumber}}]

Fixtures and Fittings: [{{property.fixturesScheduleText}}]

---
Template document. Not legal advice. Not suitable if: the Property is situated in Wales (additional requirements apply under the Renting Homes (Wales) Act 2022); the Tenant is a residential occupier (Housing Act 1988 applies); the lease is a contract to which the pre-emption rights under the Landlord and Tenant Act 1987 apply; the Building is a listed property with specific heritage consent requirements. This template reflects general UK commercial property practice and must be reviewed by a qualified property solicitor before use. Jurisdiction: United Kingdom (England & Wales).`;

const LEGEND_COMMERCIAL_LEASE_UK: LegendItem[] = [
  { path: 'party.landlord.name', label: "Landlord's legal name", type: 'string', required: true, example: 'Westfield Commercial Properties Ltd' },
  { path: 'party.landlord.entityType', label: "Landlord's entity type", type: 'string', required: true, example: 'a private limited company' },
  { path: 'party.landlord.registeredAddress', label: "Landlord's registered address", type: 'text', required: true, example: '1 Canada Square, London, E14 5AB' },
  { path: 'party.tenant.name', label: "Tenant's legal name", type: 'string', required: true, example: 'Cobalt Digital Media Ltd' },
  { path: 'party.tenant.entityType', label: "Tenant's entity type", type: 'string', required: true, example: 'a private limited company' },
  { path: 'party.tenant.registeredAddress', label: "Tenant's registered address", type: 'text', required: true, example: '200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'property.buildingDescription', label: 'Building description', type: 'string', required: true, example: 'Aldersgate Point, 200 Aldersgate Street, London EC1A 4HD' },
  { path: 'property.propertyType', label: 'Property type', type: 'enum', required: true, rules: { options: ['office suite', 'retail unit', 'warehouse', 'industrial unit'] }, example: 'office suite' },
  { path: 'property.floorLevel', label: 'Floor/level', type: 'string', required: true, example: 'third floor (Suite 301)' },
  { path: 'property.buildingAddress', label: 'Building address', type: 'text', required: true, example: 'Aldersgate Point, 200 Aldersgate Street, London, EC1A 4HD' },
  { path: 'property.permittedUse', label: 'Permitted use', type: 'string', required: true, example: 'offices, professional and financial services, and any other use within Class B1 of the Town and Country Planning (Use Classes) Order 1987 (as amended)' },
  { path: 'property.epcRating', label: 'EPC rating', type: 'string', required: false, example: 'B' },
  { path: 'property.epcCertificateNumber', label: 'EPC certificate number', type: 'string', required: false, example: '1234-5678-9012-3456' },
  { path: 'property.fixturesSchedule', label: 'Fixtures schedule number', type: 'string', required: false, example: '1' },
  { path: 'property.fullDescription', label: 'Full property description', type: 'text', required: true, example: 'Third floor office suite (Suite 301) having a net internal area of approximately 4,500 square feet (418 square metres), together with 4 designated parking spaces in the basement car park, situated at Aldersgate Point, 200 Aldersgate Street, London, EC1A 4HD.' },
  { path: 'property.fixturesScheduleText', label: 'Fixtures and fittings description', type: 'text', required: false, example: 'All desks, chairs, and partitioning currently installed in the Property; kitchen and WC facilities; HVAC system; data cabling and trunking (as at the date of this Lease, as more particularly described in the schedule of condition prepared by [Surveyor] and dated [Date]).' },
  { path: 'terms.commencementDate', label: 'Term commencement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.termYears', label: 'Term length (years)', type: 'number', required: true, example: 5 },
  { path: 'terms.termEndDate', label: 'Term end date', type: 'date', required: true, example: '2030-06-30' },
  { path: 'terms.breakDate', label: 'Break date', type: 'date', required: false, example: '2027-06-30' },
  { path: 'terms.breakNoticeSchedule', label: 'Break notice schedule reference', type: 'string', required: false, example: '3' },
  { path: 'terms.breakClauseReference', label: 'Break clause reference', type: 'string', required: false, example: '7.1' },
  { path: 'terms.breakOptionText', label: 'Break option full text', type: 'text', required: false, example: '7.1 The Tenant may terminate this Lease on the Break Date (but not otherwise) by serving a Break Notice on the Landlord not less than 6 months prior to the Break Date. The break shall be conditional upon: (a) all rents and other sums due under this Lease having been paid in full to the Break Date; (b) the Property being yielded up in the condition required by Clause 5.2. If either condition is not satisfied, the Break Notice shall be invalid and this Lease shall continue in full force.' },
  { path: 'terms.contractorWarrantyClause', label: 'Contractor warranty clause reference', type: 'string', required: false, example: '5.14' },
  { path: 'terms.essentialTermsClauseReferences', label: 'Essential terms clause references', type: 'string', required: false, example: '5.1 (Rent), 5.3 (Use), 5.8 (Assignment and Sub-letting), 5.10 (Return of Property)' },
  { path: 'terms.rentReviewText', label: 'Rent review text', type: 'text', required: false, example: 'The Rent shall be reviewed on the third anniversary of the Commencement Date and on each subsequent fifth anniversary (each a "Review Date"). The Rent payable from each Review Date shall be the higher of: (a) the Rent immediately before the Review Date; and (b) the Market Rent at the Review Date. The Market Rent shall be determined by agreement between the Parties or, failing agreement, by a single surveyor agreed upon by both Parties (or, failing agreement, appointed by the President of the Royal Institution of Chartered Surveyors).' },
  { path: 'terms.securityOfTenureText', label: 'Security of tenure text', type: 'text', required: false, example: 'This Lease is contracted out of the security of tenure provisions of the Landlord and Tenant Act 1954, Part II, in accordance with sections 38A and 57 of that Act. The Tenant acknowledges that it has received a notice in the prescribed form advising it of the effect of excluding such security of tenure.' },
  { path: 'rent.annualRent', label: 'Annual rent (GBP)', type: 'number', required: true, example: 95000 },
  { path: 'rent.firstQuarterRent', label: 'First quarter rent (GBP)', type: 'number', required: true, example: 23750 },
  { path: 'rent.depositAmount', label: 'Rent deposit (GBP)', type: 'number', required: true, example: 47500 },
  { path: 'rent.depositClauseReference', label: 'Deposit clause reference', type: 'string', required: false, example: '4.1' },
  { path: 'rent.gracePeriodDays', label: 'Rent grace period (days)', type: 'number', required: false, example: 14 },
  { path: 'rent.interestRateAboveBase', label: 'Interest rate above base (%)', type: 'number', required: false, example: 4 },
  { path: 'rent.depositInterestRate', label: 'Deposit interest rate (%)', type: 'number', required: false, example: 1 },
  { path: 'rent.depositTopUpDays', label: 'Deposit top-up deadline (days)', type: 'number', required: false, example: 10 },
  { path: 'rent.depositReturnDays', label: 'Deposit return period (days)', type: 'number', required: false, example: 21 },
  { path: 'rent.serviceChargeSchedule', label: 'Service charge schedule number', type: 'string', required: false, example: '2' },
  { path: 'rent.servicesSchedule', label: 'Services schedule number', type: 'string', required: false, example: '2' },
  { path: 'rent.rentReviewSchedule', label: 'Rent review schedule reference', type: 'string', required: false, example: '4' },
  { path: 'landlord.servicesInterruptionClause', label: 'Services interruption clause reference', type: 'string', required: false, example: '6.3' },
  { path: 'obligations.decorationCycleYears', label: 'Decoration cycle (years)', type: 'number', required: false, example: 3 },
  { path: 'obligations.inspectionNoticeHours', label: 'Inspection notice (hours)', type: 'number', required: false, example: 72 },
  { path: 'obligations.alterationNoticePeriodDays', label: 'Alteration notice period (days)', type: 'number', required: false, example: 14 },
  { path: 'obligations.publicLiabilityMinimum', label: 'Public liability minimum (GBP)', type: 'number', required: false, example: 5000000 },
  { path: 'obligations.certCopyDays', label: 'Certificate copy deadline (days)', type: 'number', required: false, example: 5 },
  { path: 'default.gracePeriodDays', label: 'Default grace period (days)', type: 'number', required: false, example: 14 },
  { path: 'default.remedyPeriodDays', label: 'Breach remedy period (days)', type: 'number', required: false, example: 28 },
  { path: 'signatures.landlordSignatoryName', label: "Landlord signatory name", type: 'string', required: true, example: 'Charles Edward Harrington' },
  { path: 'signatures.landlordSignatoryTitle', label: "Landlord signatory title", type: 'string', required: true, example: 'Director' },
  { path: 'signatures.tenantSignatoryName', label: "Tenant signatory name", type: 'string', required: true, example: 'Victoria Rose Ashworth' },
  { path: 'signatures.tenantSignatoryTitle', label: "Tenant signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.leaseDate', label: 'Lease date', type: 'date', required: true, example: '2025-06-30' },
];


async function getNextVersion(prisma: PrismaClient, templateId: string): Promise<number> {
  const last = await prisma.templateVersion.findFirst({
    where: { templateId },
    orderBy: { version: 'desc' },
  });
  return (last?.version ?? 0) + 1;
}
async function seedProduct(slug: string, title: string, category: string, jurisdiction: string, label: string, body: string, legend: LegendItem[]) {
  const product = await prisma.product.upsert({
    where: { slug },
    update: { status: ProductStatus.PUBLISHED, title, category },
    create: { slug, title, category, type: ProductType.SINGLE, status: ProductStatus.PUBLISHED },
  });
  let template = await prisma.template.findFirst({ where: { productId: product.id, jurisdiction } });
  if (!template) template = await prisma.template.create({ data: { productId: product.id, jurisdiction, name: title, description: label } });
  const existing = await prisma.templateVersion.findFirst({ where: { templateId: template.id, isActive: true } });
  if (existing) { console.log('[SKIP] ' + slug + ' (' + jurisdiction + ')'); return; }
  const v = await prisma.templateVersion.create({
    data: { version: await getNextVersion(prisma, template.id),
        templateId: template.id,
        isActive: true, rendererType: 'HANDLEBARS', outputFormat: OutputFormat.PDF, inputSchemaJson: {}, placeholderLegend: buildLegend(legend), bodyTemplate: body, promptTemplate: '', lastValidatedAt: new Date(), lastValidationErrors: [] },
  });
  const issues = validateTemplateVersion(v, payload(legend)).issues;
  if (issues.length) console.warn('[WARN] ' + slug + ' (' + jurisdiction + '):', issues[0].path + ': ' + issues[0].message);
  console.log('[OK] ' + slug + ' (' + jurisdiction + ') — v=' + v.id);
}

async function main() {
  await seedProduct('commercial-lease', 'Commercial Lease', 'Property & Real Estate', 'UK', 'United Kingdom (England & Wales)', LEASE_UK, LEGEND_COMMERCIAL_LEASE_UK);
}

main().catch(console.error).finally(() => prisma.$disconnect());