1) Compliance blueprint for static templates (Markdown)
Global rules for every template
Must include

Jurisdiction selector: UK (England & Wales), US (general/state-agnostic), EU (general + GDPR-aware).

Plain-language explanations in the UI (not in the legal doc), especially for risky fields (termination basis, liability caps, etc.).

Document metadata: title, version, last updated, jurisdiction, parties.

Signature block: names, titles (if business), date, optional witness/notary instructions where relevant.

Disclaimer section (UI, not embedded as “legal advice”):

“Template document. Not legal advice.”

“Not suitable if…” (template-specific)

“Local law may require additional steps.”

Must not include

Claims of being “legally guaranteed”, “attorney approved”, or “compliant in all cases.”

State-specific statutory citations unless you’re actually maintaining per-state variants.

Unenforceable “penalty” language (especially in NDAs and consumer contexts).

Template mechanics (static)

Use placeholders like {{party.employerName}}

Use conditional blocks, e.g.:

{{#if compensation.bonus}}...{{/if}}

Maintain separate template bodies per jurisdiction where needed (UK/US/EU), not “one size fits all” with tiny wording changes.

Store a field legend (machine-readable) alongside the template so admins can safely edit without breaking placeholders.

Template-by-template compliance checklist (20)
1) Job Offer & Employment Terms (Fast-Track)

UK must include

Start date, job title, place of work, hours, pay, holiday entitlement (incl. statutory minimum), probation (optional), notice periods, key policies reference.
UK must not

“At-will” language.

Overly broad restrictive covenants without warning (prefer reference-only if you’re not generating bespoke covenants).

US must include

At-will statement (where lawful), offer contingencies (background check optional), pay/benefits summary, start date, confidentiality/IP (if used).
US must not

Promises implying guaranteed employment duration.

State-specific wage/leave rules unless you implement state addenda variants.

EU must include

Core terms required locally: role, start date, working time, pay, leave, notice framework, probation only if lawful.
EU must not

At-will language.

2) Employment Termination Letter (Clean Exit)

UK must include

Last day, notice/PILON, final pay, holiday pay, return of property, next steps, contact.
UK must not

Redundancy/settlement language unless you have dedicated templates.

US must include

Neutral tone, final pay timing prompt (state varies), benefits end info placeholder, return of property.
US must not

Statements implying discrimination, admissions of fault, or “cause” language without careful selection.

EU must include

Neutral wording, note that cause/consultation rules vary, final pay, property return.
EU must not

Casual “effective immediately” language unless jurisdiction allows.

3) Freelancer / Services Agreement (Plain-Language)

UK must include

Scope, fees, invoicing, IP ownership/assignment, confidentiality, termination, independent contractor statement.

Optional IR35-friendly wording (non-determinative, but careful).
UK must not

Employment-like control clauses (hours, exclusivity) unless clearly optional and flagged.

US must include

Independent contractor statement, taxes responsibility, IP, confidentiality, limitation of liability.
US must not

Employment-like control that triggers misclassification risk.

EU must include

Scope, payment, IP, confidentiality, termination, GDPR module if personal data.
EU must not

Clauses that contradict mandatory worker protections.

4) Mutual NDA

All jurisdictions must include

Definition of confidential information, exclusions, permitted disclosures, term, remedies (careful), return/destruction, governing law.
Must not

“Liquidated damages” amounts by default.

Non-compete disguised as confidentiality.

5) GDPR Data Processing Addendum (Controller–Processor)

UK/EU must include

Roles, instructions, confidentiality, security measures, subprocessors, assistance with rights, breach notification, deletion/return, audits, international transfers module (optional SCCs), annexes (data categories, security).
Must not

SCCs included as “always” without toggle.

Contradictions vs. master agreement (must include order of precedence section).

US

If offered, position as “privacy addendum” with optional transfer module, avoid GDPR claims unless relevant.

6) Master Service Agreement (SMB-Friendly)

All must include

Ordering mechanism (Order Form/SOW), payment, IP, confidentiality, warranties, limitation of liability, termination, disputes, notices.
Must not

Consumer terms unless explicitly a B2C variant.

Unlimited indemnities by default.

7) Statement of Work (SOW)

All must include

Deliverables, timeline, acceptance criteria, fees, assumptions, dependencies, change control, contacts.
Must not

Boilerplate that conflicts with MSA (keep it scoped).

8) Change Order / Variation

All must include

Reference agreement, scope change, price/time impact, effective date, approvals.
Must not

Full restatement of entire contract.

9) Website/App Privacy Policy (GDPR/UK/US Baseline)

UK/EU must include

Controller identity, lawful bases, rights, retention, international transfers, cookies, processors, complaints authority info, contact.
Must not

Claiming compliance if they don’t follow it (“this must match real processing”).

US must include

Categories collected, purposes, sharing, rights request process; optional CPRA language toggle.
Must not

CPRA promises unless toggle enabled and operationally supported.

10) Terms of Service (SaaS/B2B)

All must include

Accounts, acceptable use, fees, IP license, disclaimers, liability cap, termination, dispute resolution.
Must not

Consumer rights waivers (EU/UK invalid), or arbitration terms if you’re not confident.

11) Simple Loan Agreement (Friends/Family/Director Loan)

All must include

Principal, repayment schedule, interest optional, default handling, early repayment, governing law.
Must not

Usury-sensitive interest defaults (make interest optional + warning).

Security/collateral unless separate secured variant.

12) Residential Tenancy Agreement (Landlord-Safe)

UK must include

AST assumptions (E&W), deposit scheme reminder, rent, repairs, notice basics, inventory checklist reference.
UK must not

Illegal fees/clauses (e.g., blanket penalties).

US must include

Rent, deposit, utilities, maintenance, entry notice, late fees caution.
US must not

One-size-fits-all notice periods or eviction procedures.

EU must include

Repairs/habitability framing, notice framework placeholders.
EU must not

UK AST-specific language.

13) Service Level Agreement (SLA)

All must include

Uptime target, support hours, severity levels, maintenance windows, credits, exclusions, reporting.
Must not

Credits that conflict with liability cap unless explicitly aligned.

14) Incident Response & Breach Notice Pack

UK/EU must include

GDPR reporting timeline prompts, regulator notice template, data subject notice template, incident timeline.
US must include

General notice template + warning that state law varies.
Must not

Assuring no obligation to notify.

15) Performance Improvement Plan (PIP)

All must include

Issues, goals, timeline, support, check-ins, outcomes.
Must not

Language implying guaranteed termination.

16) Employment Reference / Confirmation Letter

All must include

Name, role, dates, verification contact; optional expanded section toggle.
Must not

Defamatory or speculative statements.

17) Founders’ Agreement (Pre-Incorporation MOU)

All must include

Roles, equity intent, vesting intent, IP assignment intent, decision-making, dispute pathway.
Must not

Pretending it replaces incorporation docs (explicitly a pre-incorporation understanding).

18) Shareholders’ Agreement (SMB)

All must include

Governance, reserved matters, transfer restrictions, drag/tag, dispute resolution, dividends optional.
Must not

Country-specific company law mechanics unless you create variants.

19) Simple Will & Executor Instructions

UK must include

E&W witnessing instructions (UI guidance), executors, guardians, gifts, residue.
US must include

Warning: state formalities differ (witness/notary), simple bequests.
EU must include

Warning: forced heirship varies widely (flag “not suitable” for some jurisdictions).
Must not

Tax planning, trusts, complex estates by default.

20) Power of Attorney (Health & Financial, Simple)

UK must include

Guidance only: LPAs are usually official forms (strong “not a substitute” warning).
US must include

Warning: state POA forms vary; springing vs immediate; notarization often required.
EU must include

Mandate/representation varies; warn heavily.
Must not

Presenting as officially valid without local formalities.