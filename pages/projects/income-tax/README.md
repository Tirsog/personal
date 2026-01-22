# Income Tax Calculator 💰

An interactive calculator that shows take-home pay for UK and Spain with detailed tax breakdowns for the 2025/26 tax year.

## Live Demo

[https://tirsog.es/projects/income-tax](https://tirsog.es/projects/income-tax)

## Features

- **Dual Country Support**: Calculate taxes for both UK and Spain
- **Tab-Based Interface**: Easy switching between countries with visual feedback
- **Localized Content**:
  - UK: English labels with £ currency
  - Spain: Spanish labels with € currency
- **Comprehensive Breakdown**:
  - Gross salary (annual & monthly)
  - Income tax calculations
  - Social security contributions
  - Net take-home pay
- **Tax Bracket Visualization**: Detailed table showing how income is taxed at each bracket
- **Input Validation**: Real-time feedback for valid salary ranges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Above-the-Fold Results**: All information visible without scrolling on most screens

## Tax Rates Used

### UK (2025/26 Tax Year)

**Income Tax Brackets:**
- £0 - £12,570: 0% (Personal Allowance)
- £12,571 - £50,270: 20% (Basic rate)
- £50,271 - £125,140: 40% (Higher rate)
- £125,141+: 45% (Additional rate)

**National Insurance Contributions:**
- £0 - £12,570: 0%
- £12,571 - £50,270: 8%
- £50,271+: 2%

**Notes:**
- Rates apply to England, Wales, and Northern Ireland
- Scotland has different income tax rates (not included)
- Does not account for personal allowance taper (£100k+)
- Student loan repayments not included
- Pension contributions not factored in

### Spain (2025 Tax Year)

**IRPF (Income Tax) Brackets:**
- €0 - €12,450: 19%
- €12,451 - €20,200: 24%
- €20,201 - €35,200: 30%
- €35,201 - €60,000: 37%
- €60,001 - €300,000: 45%
- €300,001+: 47%

**Social Security Contributions:**
- Employee rate: 6.35%
- Maximum contribution base: €53,400

**Notes:**
- Uses general state rates (not autonomous community rates)
- Regional variations not included (Basque Country, Navarra, etc.)
- Autonomous community surcharges not applied
- No deductions or tax credits included
- Wealth tax not considered

## Technical Implementation

### Stack
- **Framework**: Next.js 15 with React 19
- **Styling**: CSS Modules
- **Routing**: Next.js Pages Router
- **Rendering**: Client-side (marked with `"use client"`)

### Architecture

```
/pages/projects/income-tax/
├── index.js          # Main calculator component
└── README.md         # This file

/styles/
└── IncomeTax.module.css  # All styling
```

### Calculation Approach

**Bracket-Based Taxation:**
1. Iterate through tax brackets from lowest to highest
2. For each bracket, calculate the portion of income that falls within it
3. Apply the bracket's tax rate to that portion
4. Sum all bracket taxes to get total income tax

**Social Security:**
- UK: Progressive NI rates applied like income tax
- Spain: Flat 6.35% rate with a maximum contribution cap

### Key Design Decisions

1. **Static Tax Data**: Tax rates hardcoded as constants (infrastructure data that rarely changes)
2. **Button-Triggered Calculation**: Not real-time to give users control
3. **Tab State Management**: Single `useState` for country selection
4. **Localization**: Inline labels object that switches based on active tab
5. **Currency Formatting**: Uses `toLocaleString()` with country-specific locales
6. **Validation**: Real-time input validation with disabled button states

## Test Cases

The calculator has been tested with the following scenarios:

### UK
- £20,000 → Basic rate taxpayer
- £50,270 → Boundary of basic rate
- £75,000 → Higher rate taxpayer
- £150,000 → Additional rate taxpayer
- £12,570 → Personal allowance edge case

### Spain
- €15,000 → Low earner spanning two brackets
- €30,000 → Middle bracket
- €65,000 → Higher bracket with SS cap
- €100,000 → Top brackets

## Known Limitations

### General Simplifications
- Single employment only (no multiple jobs)
- No other income sources (dividends, rental, etc.)
- No tax reliefs, credits, or deductions
- No dependent/family considerations
- No regional tax variations

### UK-Specific
- Personal allowance taper not implemented (£100k-£125k)
- Scottish income tax rates not included
- No student loan repayments
- Pension contributions not factored
- Marriage allowance not considered
- Blind person's allowance not included

### Spain-Specific
- Autonomous community rates not applied
- No regional deductions (e.g., housing, family)
- Wealth tax not calculated
- Minimum personal allowance (€5,550) not applied
- Joint taxation option not available
- No expatriate regime (Beckham Law)

## Disclaimer

⚠️ **For Educational Purposes Only**

This calculator provides estimates for educational purposes only. Actual tax liability depends on:
- Individual circumstances
- Regional/autonomous community rates
- Available deductions and reliefs
- Other income sources
- Tax credits and allowances

**UK users**: Rates assume England/Wales/Northern Ireland. Scotland has different rates.

**Spain users**: Uses general state rates without regional variations.

**Always consult a qualified tax advisor for accurate tax advice.**

## Future Enhancements

Potential improvements (not currently implemented):
- Scotland tax rates for UK
- Autonomous community selection for Spain
- Pension contributions calculator
- Student loan repayment estimates
- Multiple income sources
- Tax-free savings (ISA, pension relief)
- Comparison view (UK vs Spain side-by-side)
- Historical tax year comparison
- Export results as PDF

## Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Run production build
yarn start
```

Navigate to `http://localhost:3000/projects/income-tax` to view the calculator.

## Credits

Built by [Tirso García](https://tirsog.es) as part of a personal projects collection.

Tax rates sourced from:
- [UK Government: Income Tax rates and allowances](https://www.gov.uk/income-tax-rates)
- [UK Government: National Insurance rates](https://www.gov.uk/national-insurance-rates-letters)
- [Spanish Tax Agency (AEAT): IRPF rates](https://sede.agenciatributaria.gob.es/)
- [Spanish Social Security: Contribution bases](https://www.seg-social.es/)

Last updated: January 2026
