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

// ─── COMMERCIAL LEASE — US ───────────────────────────────────────────────────

const LEASE_US = `COMMERCIAL LEASE

Title: Commercial Lease Agreement
Version: 1
Jurisdiction: United States of America (General — adapt for specific state law)

Date: [{{dates.leaseDate}}]

LANDLORD AND TENANT LEASE AGREEMENT

THIS LEASE AGREEMENT (this "Lease") is entered into as of [{{dates.leaseDate}}] (the "Effective Date"), by and between:

[{{party.landlord.name}}], [{{party.landlord.entityType}}] ("Landlord"), with a principal address of [{{party.landlord.address}}]; and

[{{party.tenant.name}}], [{{party.tenant.entityType}}] ("Tenant"), with a principal address of [{{party.tenant.address}}].

Landlord and Tenant may be referred to individually as a "Party" and collectively as the "Parties."

RECITALS

WHEREAS, Landlord is the owner of the real property described herein; and

WHEREAS, Tenant desires to lease the Premises from Landlord upon the terms and conditions set forth in this Lease;

NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. PREMISES AND COMMON AREAS

1.1 Leased Premises. Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the premises described in Exhibit A attached hereto (the "Premises"), together with the right to use, in common with others, the common areas serving the Building (as defined below).

1.2 Building. The building in which the Premises are located (the "Building") is situated at [{{property.buildingAddress}}] and is of the type commonly known as a [{{property.buildingType}}].

1.3 Common Areas. "Common Areas" means all areas and facilities within the Building that are available for the non-exclusive use of tenants of the Building, including without limitation corridors, elevators, stairways, restrooms, parking areas, driveways, and landscaped areas.

1.4 Permitted Use. The Premises shall be used and occupied by Tenant solely for the Permitted Use set forth in Section [{{property.permittedUseSection}}] and for no other purpose whatsoever.

2. TERM

2.1 Initial Term. The initial term of this Lease (the "Initial Term") shall commence on the Commencement Date of [{{terms.commencementDate}}] and, unless earlier terminated in accordance with this Lease, shall expire on the Expiration Date of [{{terms.expirationDate}}].

2.2 Early Occupancy. If Landlord permits Tenant to occupy the Premises prior to the Commencement Date, such early occupancy shall be subject to all of the terms and conditions of this Lease, and the Term shall be deemed to have commenced on the date of such early occupancy.

2.3 Holding Over. If Tenant remains in possession of the Premises after the expiration or earlier termination of this Lease without the express written consent of Landlord, such holdover tenancy shall be on a month-to-month basis terminable by either Party upon [{{terms.holdoverNoticeDays}}] days' written notice to the other Party. During any holdover period, Tenant shall pay Monthly Rent at [{{terms.holdoverRentMultiplier}}]% of the Monthly Rent in effect immediately prior to the expiration or termination of this Lease.

3. BASE RENT

3.1 Amount. Commencing on the Rent Commencement Date of [{{rent.rentCommencementDate}}], Tenant shall pay to Landlord base rent (as distinguished from Additional Rent, as defined below) in the amount of USD $[{{rent.monthlyRent}}] per month (the "Base Rent"), payable in advance on or before the first day of each calendar month during the Term, without any offset, deduction, or counterclaim.

3.2 Additional Rent. All amounts payable by Tenant under this Lease other than Base Rent shall constitute "Additional Rent" and shall be payable in the same manner as Base Rent. Tenant's obligations to pay Base Rent and Additional Rent are independent covenants.

3.3 Proration. If the Term commences or expires on a day other than the first day of a calendar month, the Base Rent for such partial month shall be prorated on a per-diem basis based upon a 365-day year.

3.4 Late Payment. If any payment of Base Rent or Additional Rent is not received by Landlord within [{{rent.gracePeriodDays}}] days after the date due, Tenant shall pay to Landlord a late fee equal to [{{rent.lateFeePercent}}]% of the amount overdue, or USD $[{{rent.lateFeeMinimum}}], whichever is greater, to defray Landlord's administrative costs. This late fee shall not be deemed a waiver of Landlord's right to pursue any other remedy available under this Lease or at law.

3.5 Security Deposit. Upon the execution of this Lease, Tenant shall deposit with Landlord the sum of USD $[{{rent.securityDeposit}}] (the "Security Deposit"), to be held as security for the faithful performance by Tenant of all of Tenant's obligations under this Lease. Landlord may, without limitation, apply the Security Deposit to cure any default by Tenant. Within [{{rent.securityDepositReturnDays}}] days after the expiration or termination of this Lease and Tenant's surrender of the Premises in the condition required hereunder, Landlord shall return the Security Deposit (or any balance remaining after lawful deductions) to Tenant.

4. ADDITIONAL RENT — OPERATING EXPENSES

4.1 Definitions. For purposes of this Section:

(a) "Operating Expenses" means all actual, reasonable costs and expenses incurred by Landlord in connection with the ownership, operation, maintenance, repair, replacement, and management of the Building and the Common Areas, including without limitation: real property taxes and assessments; insurance premiums; utilities; janitorial services; landscaping; snow removal; repairs and maintenance; management fees; and reserves for capital improvements.

(b) "Taxes" means all real property taxes, assessments, special assessments, and other charges imposed upon or with respect to the Building and the land thereunder, together with any tax or assessment levied in lieu of or in substitution for any of the foregoing.

4.2 Tenant's Proportionate Share. Tenant shall pay to Landlord, as Additional Rent, Tenant's Proportionate Share of Operating Expenses. "Tenant's Proportionate Share" means [{{rent.tenantProportionateShare}}]%, being the ratio of the rentable square footage of the Premises to the total rentable square footage of the Building.

4.3 Estimated Payments. Landlord may estimate Tenant's Proportionate Share of Operating Expenses for each calendar year or portion thereof during the Term. Tenant shall pay such estimated amount in equal monthly installments, together with each payment of Base Rent.

4.4 Annual Reconciliation. Within [{{rent.reconciliationDays}}] days after the end of each calendar year, Landlord shall deliver to Tenant a written statement (the "Reconciliation Statement") setting forth the actual Operating Expenses for such calendar year and Tenant's Proportionate Share thereof. Any overpayment by Tenant shall be credited against the next installment of Additional Rent due; any underpayment by Tenant shall be due and payable within [{{rent.reconciliationPaymentDays}}] days of delivery of the Reconciliation Statement.

5. UTILITIES AND SERVICES

5.1 Utilities. Tenant shall pay, directly to the provider of each utility, all charges for utilities consumed at the Premises. Tenant acknowledges that Landlord does not furnish or supply utilities, except as otherwise expressly provided in this Lease or as to any utilities that are Landlord's responsibility under applicable law.

5.2 Services. Landlord shall provide the following services to the Building and the Premises: [{{utilities.servicesText}}].

5.3 Interruption of Services. Landlord shall not be liable for any failure to furnish, stoppage, or interruption of any utility or service where such failure is caused by circumstances beyond Landlord's reasonable control. Landlord shall use reasonable efforts to restore any interrupted utility or service.

6. MAINTENANCE AND REPAIRS

6.1 Landlord's Obligations. Landlord shall maintain, repair, and replace, as necessary: (a) the structural portions of the Building, including without limitation the foundation, floor slabs, roof, and exterior walls; (b) the Building's mechanical, electrical, plumbing, HVAC, life safety, and elevator systems, to the extent such systems serve the Building generally; (c) the Common Areas.

6.2 Tenant's Obligations. Tenant shall, at Tenant's sole cost and expense: (a) maintain the Premises in a clean, sanitary, and safe condition; (b) repair and replace any damage to the Premises caused by Tenant's use or occupancy or by the acts or omissions of Tenant's agents, employees, contractors, or invitees; (c) keep the Premises in good order and condition; (d) comply with all applicable laws, codes, and regulations relating to Tenant's use and occupancy of the Premises.

6.3 Compliance. Tenant shall, at Tenant's sole cost and expense, comply with all present and future applicable laws, ordinances, rules, regulations, orders, and requirements of any governmental or quasi-governmental authority relating to Tenant's particular use of the Premises (as distinguished from the Building generally), including without limitation the Americans with Disabilities Act (the "ADA") as it applies to Tenant's use of the Premises.

7. ALTERATIONS

7.1 Tenant Alterations. Tenant shall not make or permit to be made any alterations, additions, or improvements to the Premises (collectively, "Alterations") without the prior written consent of Landlord, which consent shall not be unreasonably withheld, conditioned, or delayed with respect to any Alteration that: (a) is not structural in nature; (b) does not affect the mechanical, electrical, plumbing, HVAC, or life safety systems of the Building; (c) does not require any permit from any governmental authority; and (d) is consistent with the Permitted Use.

7.2 Procedures. Prior to making any Alteration, Tenant shall: (a) submit to Landlord detailed plans and specifications for the proposed Alteration; (b) obtain Landlord's written approval; (c) obtain all required permits and governmental approvals; (d) use contractors approved by Landlord; (e) comply with all applicable laws and regulations. Upon completion of any Alteration, Tenant shall provide Landlord with as-built drawings.

7.3 Removal. Unless Landlord elects otherwise, Tenant shall, upon the expiration or termination of this Lease, remove all Alterations made by Tenant and restore the Premises to the condition existing prior to such Alterations, reasonable wear and tear excepted.

7.4 Signs. Tenant shall not install any exterior sign, awning, or antenna without the prior written consent of Landlord and any applicable governmental authority.

8. INSURANCE

8.1 Tenant's Insurance. Tenant shall, at Tenant's sole cost and expense, maintain throughout the Term: (a) commercial general liability insurance, including without limitation blanket, contractual liability, and personal injury coverage, with limits of not less than USD $[{{insurance.generalLiabilityLimit}}] per occurrence and USD $[{{insurance.generalLiabilityAggregate}}] in the aggregate; (b) property insurance covering Tenant's personal property and trade fixtures; (c) workers' compensation insurance as required by applicable law; (d) [{{insurance.additionalInsuranceText}}]. All such insurance shall name Landlord as an additional insured.

8.2 Landlord's Insurance. Landlord shall maintain throughout the Term: (a) property insurance covering the Building and Landlord's property in amounts not less than the replacement cost thereof; (b) commercial general liability insurance with respect to Landlord's responsibilities under this Lease; (c) such other insurance as Landlord deems appropriate.

8.3 Waiver of Subrogation. To the fullest extent permitted by law, each Party waives any right of recovery against the other Party for any loss or damage to its property sustained by reason of any peril insured against under its property insurance policies.

9. CASUALTY AND CONDEMNATION

9.1 Casualty. If the Premises or the Building are damaged or destroyed by fire or other casualty, Landlord shall: (a) if the damage is such that the Premises cannot reasonably be restored to substantially the same condition as existed prior to such damage within [{{casualty.restorationDays}}] days of the date of such damage, either Party may terminate this Lease upon written notice to the other Party within [{{casualty.terminationNoticeDays}}] days after the date of such damage; (b) if neither Party elects to terminate, Landlord shall proceed with reasonable diligence to restore the Premises to substantially the same condition as existed prior to such damage, in which case this Lease shall remain in full force and effect and Base Rent shall be equitably abated for the period during which the Premises are uninhabitable.

9.2 Condemnation. If all or a material portion of the Premises are taken or condemned for public use, this Lease shall terminate as of the date of such taking or condemnation. If less than a material portion of the Premises is taken or condemned, Landlord shall restore the Premises to the extent reasonably practicable, and Base Rent shall be equitably abated for the period of such taking. All compensation awarded for any taking or condemnation shall belong to Landlord, and Tenant shall have no claim thereto.

10. LANDLORD'S ACCESS

10.1 Access. Landlord and Landlord's agents may enter the Premises at any reasonable time upon not less than [{{access.noticeHours}}] hours' prior notice (or immediately in case of emergency): (a) to inspect the condition of the Premises; (b) to make repairs, replacements, or alterations as Landlord deems necessary or desirable; (c) to show the Premises to prospective purchasers, mortgagees, or tenants; (d) to comply with any applicable law or directive of any governmental authority. Landlord shall minimize any unreasonable interference with Tenant's use of the Premises in exercising the foregoing rights.

10.2 Showing Premises. During the final [{{access.showingDays}}] days of the Term, Landlord may display "For Lease" signs on the Premises and show the Premises to prospective tenants at reasonable times.

11. QUIET ENJOYMENT

11.1 Covenant. Landlord covenants that, so long as Tenant pays the Base Rent and Additional Rent and performs all of Tenant's other obligations under this Lease, Tenant shall and may peacefully and quietly have, hold, and enjoy the Premises during the Term, free from any interference by Landlord or any person claiming through Landlord.

11.2 No Merger. There shall be no merger of this Lease, or of the leasehold estate created hereby, with any other estate or interest in the Premises or the Building by reason of the fact that this Lease or such leasehold estate may merge with any such other estate or interest.

12. TENANT'S COVENANTS

12.1 Payment. Tenant shall pay the Base Rent and Additional Rent when due, without any offset, deduction, or counterclaim.

12.2 Use. Tenant shall use the Premises solely for the Permitted Use and shall not: (a) use the Premises for any purpose that is illegal, dangerous, or that may increase Landlord's insurance premiums; (b) overload any floor or system of the Building; (c) create a nuisance or disturbance; (d) store hazardous materials on the Premises without Landlord's prior written consent and compliance with all applicable laws.

12.3 Compliance. Tenant shall comply with all applicable laws, codes, and regulations relating to Tenant's use and occupancy of the Premises, including without limitation the ADA, applicable environmental laws, and all applicable fire and building codes.

12.4 Assignment and Subletting. Tenant shall not assign this Lease, sublet the Premises, or otherwise transfer any interest in this Lease without the prior written consent of Landlord, which consent shall not be unreasonably withheld. Any assignee shall assume all obligations of Tenant under this Lease by written instrument in form satisfactory to Landlord. Notwithstanding the foregoing: (a) Tenant may assign this Lease to an Affiliate (as defined below) without Landlord's consent, provided that Tenant notifies Landlord in writing prior to such assignment and the assignee assumes all obligations under this Lease; (b) Tenant shall not advertise or hold out the Premises for subletting in any manner that would violate applicable law or Landlord's exclusive rights. "Affiliate" means any entity that directly or indirectly controls, is controlled by, or is under common control with Tenant.

12.5 Surrender. Upon the expiration or termination of this Lease, Tenant shall: (a) surrender the Premises in the condition required under this Lease, broom clean, free of all Tenant's personal property and debris; (b) remove all Tenant's signage; (c) deliver all keys to Landlord; (d) cooperate with Landlord in reconnecting any utilities.

13. DEFAULT AND REMEDIES

13.1 Events of Default. Each of the following shall constitute an Event of Default by Tenant under this Lease:

(a) Tenant fails to pay any installment of Base Rent or Additional Rent within [{{default.rentGracePeriodDays}}] days after the date due;

(b) Tenant fails to perform any other obligation under this Lease and such failure continues for [{{default.leaseObligationDays}}] days after written notice from Landlord specifying the nature of the failure (or such longer period as is reasonably necessary to cure such failure, provided Tenant commences cure within such [{{default.leaseObligationDays}}] day period and diligently prosecutes the same to completion);

(c) Tenant becomes insolvent, makes an assignment for the benefit of creditors, or becomes subject to any bankruptcy, reorganization, or insolvency proceeding;

(d) Tenant abandons or vacates the Premises.

13.2 Landlord's Remedies. Upon the occurrence of any Event of Default, Landlord shall have the following remedies, in addition to all other remedies available under this Lease or at law or in equity:

(a) Landlord may terminate this Lease by written notice to Tenant, in which case Tenant's liability for Base Rent and Additional Rent shall be accelerated and immediately due and payable;

(b) Landlord may terminate Tenant's right to possession of the Premises without terminating this Lease, in which case Landlord shall use reasonable efforts to relet the Premises for the account of Tenant;

(c) Landlord may pursue any other remedy available at law or in equity.

13.3 Landlord's Right to Cure. If Tenant fails to perform any obligation under this Lease, Landlord may (but shall not be obligated to) perform such obligation on behalf of Tenant, in which case Tenant shall pay to Landlord the reasonable costs thereof, together with interest at the rate provided in Section 3.4, within [{{default.reimbursementDays}}] days of demand.

14. SUBORDINATION AND ESTOPPEL

14.1 Subordination. This Lease is and shall be subject and subordinate to any mortgage, deed of trust, or other security instrument now or hereafter placed upon the Building by Landlord, and to any and all renewals, modifications, consolidations, replacements, and extensions thereof. This provision shall be self-operative. Tenant shall, however, execute and deliver to Landlord within [{{subordination.estoppelDays}}] days of request any instrument reasonably required by Landlord or any mortgagee to confirm such subordination.

14.2 Estoppel. Each Party shall, within [{{subordination.estoppelDays}}] days after written request by the other Party, execute and deliver to the requesting Party a written estoppel certificate certifying: (a) that this Lease is in full force and effect; (b) the amount of Base Rent and Additional Rent currently payable; (c) that neither Party has any known defaults under this Lease; and (d) such other matters as the requesting Party reasonably requests.

15. MISCELLANEOUS

15.1 Entire Agreement. This Lease, together with all Exhibits attached hereto, constitutes the entire agreement between the Parties.

15.2 Amendment. No amendment or modification of this Lease shall be effective unless in writing and signed by both Parties.

15.3 Waiver and Severability. No waiver by either Party of any breach of any term or condition of this Lease shall be construed as a waiver of any subsequent breach of the same or any other term or condition. If any provision of this Lease is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

15.4 Notices. All notices and other communications under this Lease shall be in writing and shall be deemed duly delivered when: (a) personally delivered; (b) sent by certified or registered mail, return receipt requested, postage prepaid; (c) sent by nationally recognized overnight courier; or (d) sent by email with confirmation of receipt, to the addresses set forth above or as updated by written notice.

15.5 Governing Law. This Lease shall be governed by and construed in accordance with the laws of the State of [{{legal.governingState}}], without regard to its conflict of laws principles.

15.6 Jurisdiction. Each Party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in [{{legal.jurisdictionCounty}}], [{{legal.governingState}}] for any action or proceeding arising out of or relating to this Lease.

15.7 Attorneys' Fees. In any action or proceeding to enforce this Lease, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs from the non-prevailing Party.

15.8 Counterparts. This Lease may be executed in counterparts, each of which shall constitute an original and all of which together shall constitute one and the same instrument. Electronic signatures shall be deemed original signatures for all purposes.

15.9 Construction. The headings in this Lease are for convenience only. Neither this Lease nor any uncertainty or ambiguity herein shall be construed or resolved against the drafting Party, it being acknowledged that both Parties have had the opportunity to review and negotiate the terms of this Lease.

15.10 No Partnership. Nothing contained in this Lease shall be construed to create a partnership, joint venture, or agency relationship between the Parties.

15.11 No Option. The submission of this Lease for examination or signature by Tenant does not constitute a reservation of or option for the Premises, and this Lease is not effective until execution and delivery by both Parties.

IN WITNESS WHEREOF, the Parties have executed this Commercial Lease as of the date first written above.

LANDLORD:

[{{party.landlord.name}}]

By: _______________________________
Name: [{{signatures.landlordSignatoryName}}]
Title: [{{signatures.landlordSignatoryTitle}}]
Date: [{{dates.leaseDate}}]

TENANT:

[{{party.tenant.name}}]

By: _______________________________
Name: [{{signatures.tenantSignatoryName}}]
Title: [{{signatures.tenantSignatoryTitle}}]]
Date: [{{dates.leaseDate}}]

EXHIBIT A — PREMISES DESCRIPTION

[{{property.exhibitDescription}}]

---
Template document. Not legal advice. Not suitable if: the Premises are located in New York (NY Real Property Law Article 9 governs commercial leases with specific requirements); the Premises are located in California (California Civil Code Chapter 2.5 imposes specific implied covenants on commercial landlords); the lease is a "triple net" (NNN) lease or a gross lease with different allocation of expenses; the Tenant is a government entity or quasigovernmental authority with specific procurement requirements; the Building is subject to a condominium regime. This template reflects general U.S. commercial property practice and must be reviewed by a qualified real estate attorney licensed in the relevant state before use. Jurisdiction: United States of America (adapt for specific state law).`;

const LEGEND_LEASE_US: LegendItem[] = [
  { path: 'party.landlord.name', label: "Landlord legal name", type: 'string', required: true, example: 'Capstone Property Holdings LLC' },
  { path: 'party.landlord.entityType', label: "Landlord entity type", type: 'string', required: true, example: 'a limited liability company' },
  { path: 'party.landlord.address', label: "Landlord address", type: 'text', required: true, example: '100 Park Avenue, Suite 1800, New York, NY 10017' },
  { path: 'party.tenant.name', label: "Tenant legal name", type: 'string', required: true, example: 'Meridian Consulting Group Inc.' },
  { path: 'party.tenant.entityType', label: "Tenant entity type", type: 'string', required: true, example: 'a Delaware corporation' },
  { path: 'party.tenant.address', label: "Tenant address", type: 'text', required: true, example: '350 Fifth Avenue, Suite 4200, New York, NY 10118' },
  { path: 'property.buildingAddress', label: 'Building address', type: 'text', required: true, example: '100 Park Avenue, New York, NY 10017' },
  { path: 'property.buildingType', label: 'Building type', type: 'string', required: true, example: 'Class A office building' },
  { path: 'property.permittedUseSection', label: 'Permitted use clause reference', type: 'string', required: false, example: '1.4' },
  { path: 'property.exhibitDescription', label: 'Premises description for Exhibit A', type: 'text', required: true, example: 'Suite 1800 on the 18th floor of the Building, containing approximately 8,500 rentable square feet, as more particularly described in the floor plan attached as Schedule 1.' },
  { path: 'terms.commencementDate', label: 'Term commencement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'terms.expirationDate', label: 'Term expiration date', type: 'date', required: true, example: '2028-06-30' },
  { path: 'terms.holdoverNoticeDays', label: 'Holdover termination notice (days)', type: 'number', required: false, example: 30 },
  { path: 'terms.holdoverRentMultiplier', label: 'Holdover rent multiplier (%)', type: 'number', required: false, example: 125 },
  { path: 'rent.monthlyRent', label: 'Monthly base rent (USD)', type: 'number', required: true, example: 42500 },
  { path: 'rent.rentCommencementDate', label: 'Rent commencement date', type: 'date', required: true, example: '2025-07-01' },
  { path: 'rent.gracePeriodDays', label: 'Rent grace period (days)', type: 'number', required: false, example: 5 },
  { path: 'rent.lateFeePercent', label: 'Late fee percentage (%)', type: 'number', required: false, example: 5 },
  { path: 'rent.lateFeeMinimum', label: 'Late fee minimum (USD)', type: 'number', required: false, example: 250 },
  { path: 'rent.securityDeposit', label: 'Security deposit (USD)', type: 'number', required: true, example: 85000 },
  { path: 'rent.securityDepositReturnDays', label: 'Security deposit return period (days)', type: 'number', required: false, example: 30 },
  { path: 'rent.tenantProportionateShare', label: 'Tenant proportionate share (%)', type: 'number', required: true, example: 12 },
  { path: 'rent.reconciliationDays', label: 'Reconciliation statement deadline (days)', type: 'number', required: false, example: 90 },
  { path: 'rent.reconciliationPaymentDays', label: 'Reconciliation payment period (days)', type: 'number', required: false, example: 30 },
  { path: 'utilities.servicesText', label: 'Landlord services text', type: 'text', required: false, example: 'water and sewer; elevator service; HVAC during normal business hours (Monday through Friday, 8:00 a.m. to 6:00 p.m., and Saturday 9:00 a.m. to 1:00 p.m., excluding public holidays); cleaning of Common Areas.' },
  { path: 'insurance.generalLiabilityLimit', label: 'GL per occurrence limit (USD)', type: 'number', required: true, example: 2000000 },
  { path: 'insurance.generalLiabilityAggregate', label: 'GL aggregate limit (USD)', type: 'number', required: true, example: 5000000 },
  { path: 'insurance.additionalInsuranceText', label: 'Additional insurance text', type: 'text', required: false, example: 'umbrella liability insurance with limits of not less than USD 5,000,000 per occurrence and in the aggregate; business interruption insurance with limits of not less than 12 months of Rent.' },
  { path: 'casualty.restorationDays', label: 'Casualty restoration period (days)', type: 'number', required: false, example: 180 },
  { path: 'casualty.terminationNoticeDays', label: 'Casualty termination notice period (days)', type: 'number', required: false, example: 30 },
  { path: 'access.noticeHours', label: 'Access prior notice (hours)', type: 'number', required: false, example: 24 },
  { path: 'access.showingDays', label: 'Showing period before expiry (days)', type: 'number', required: false, example: 90 },
  { path: 'default.rentGracePeriodDays', label: 'Rent default grace period (days)', type: 'number', required: false, example: 5 },
  { path: 'default.leaseObligationDays', label: 'Lease obligation cure period (days)', type: 'number', required: false, example: 30 },
  { path: 'default.reimbursementDays', label: 'Reimbursement period (days)', type: 'number', required: false, example: 15 },
  { path: 'subordination.estoppelDays', label: 'Estoppel certificate deadline (days)', type: 'number', required: false, example: 10 },
  { path: 'signatures.landlordSignatoryName', label: "Landlord signatory name", type: 'string', required: true, example: 'Jonathan Reed Patterson' },
  { path: 'signatures.landlordSignatoryTitle', label: "Landlord signatory title", type: 'string', required: true, example: 'Managing Member' },
  { path: 'signatures.tenantSignatoryName', label: "Tenant signatory name", type: 'string', required: true, example: 'Alexandra Bennett Chen' },
  { path: 'signatures.tenantSignatoryTitle', label: "Tenant signatory title", type: 'string', required: true, example: 'Chief Executive Officer' },
  { path: 'dates.leaseDate', label: 'Lease execution date', type: 'date', required: true, example: '2025-06-30' },
  { path: 'legal.governingState', label: 'Governing state', type: 'string', required: true, example: 'New York' },
  { path: 'legal.jurisdictionCounty', label: 'Jurisdiction county', type: 'string', required: false, example: 'New York County' },
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
  await seedProduct('commercial-lease', 'Commercial Lease', 'Property & Real Estate', 'US', 'United States of America (general template)', LEASE_US, LEGEND_LEASE_US);
}

main().catch(console.error).finally(() => prisma.$disconnect());