"use client"

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/IncomeTax.module.css'

// UK Tax Rates 2025/26
const UK_TAX_BRACKETS = [
  { min: 0, max: 12570, rate: 0, name: "Personal Allowance" },
  { min: 12571, max: 50270, rate: 0.20, name: "Basic rate" },
  { min: 50271, max: 125140, rate: 0.40, name: "Higher rate" },
  { min: 125141, max: Infinity, rate: 0.45, name: "Additional rate" }
]

const UK_NI_BRACKETS = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12571, max: 50270, rate: 0.08 },
  { min: 50271, max: Infinity, rate: 0.02 }
]

// Spain Tax Rates 2025
const SPAIN_TAX_BRACKETS = [
  { min: 0, max: 12450, rate: 0.19, name: "Tramo 1" },
  { min: 12451, max: 20200, rate: 0.24, name: "Tramo 2" },
  { min: 20201, max: 35200, rate: 0.30, name: "Tramo 3" },
  { min: 35201, max: 60000, rate: 0.37, name: "Tramo 4" },
  { min: 60001, max: 300000, rate: 0.45, name: "Tramo 5" },
  { min: 300001, max: Infinity, rate: 0.47, name: "Tramo 6" }
]

const SPAIN_SS_RATE = 0.0635  // 6.35% employee contribution
const SPAIN_SS_MAX_BASE = 53400  // Maximum contribution base for 2025
const SPAIN_PERSONAL_MINIMUM = 5550  // Mínimo personal 2025

// Calculate work income reduction (reducción por rendimientos del trabajo)
const calculateWorkReduction = (netIncome) => {
  if (netIncome <= 19747.50) {
    return 6498
  } else if (netIncome <= 21747.50) {
    return 6498 - ((netIncome - 19747.50) * 3.2492)
  } else {
    return 0
  }
}

export default function IncomeTaxCalculator() {
  const [activeTab, setActiveTab] = useState("uk")
  const [grossSalary, setGrossSalary] = useState("")
  const [results, setResults] = useState(null)
  const [inputError, setInputError] = useState("")

  // Calculate UK taxes
  const calculateUKTax = (salary) => {
    let incomeTax = 0
    let nationalInsurance = 0
    const taxBrackets = []

    // Calculate Income Tax
    UK_TAX_BRACKETS.forEach((bracket) => {
      if (salary > bracket.min) {
        const taxableInBracket = Math.min(salary, bracket.max) - bracket.min
        const taxInBracket = taxableInBracket * bracket.rate

        if (taxableInBracket > 0) {
          incomeTax += taxInBracket

          // Only add to display if there's actual tax or it's the first bracket
          if (bracket.rate > 0 || bracket.min === 0) {
            const rangeMax = bracket.max === Infinity ? '+' : bracket.max.toLocaleString('en-GB')
            taxBrackets.push({
              range: `£${bracket.min.toLocaleString('en-GB')} - £${rangeMax}`,
              rate: `${(bracket.rate * 100).toFixed(0)}%`,
              taxableAmount: taxableInBracket,
              taxPaid: taxInBracket,
              name: bracket.name
            })
          }
        }
      }
    })

    // Calculate National Insurance
    UK_NI_BRACKETS.forEach((bracket) => {
      if (salary > bracket.min) {
        const taxableInBracket = Math.min(salary, bracket.max) - bracket.min
        const niInBracket = taxableInBracket * bracket.rate
        nationalInsurance += niInBracket
      }
    })

    const totalDeductions = incomeTax + nationalInsurance
    const netAnnual = salary - totalDeductions
    const netMonthly = netAnnual / 12
    const grossMonthly = salary / 12

    return {
      country: "uk",
      currency: "£",
      grossAnnual: salary,
      grossMonthly: grossMonthly,
      incomeTax: incomeTax,
      socialSecurity: nationalInsurance,
      totalDeductions: totalDeductions,
      netAnnual: netAnnual,
      netMonthly: netMonthly,
      taxBrackets: taxBrackets
    }
  }

  // Calculate Spain taxes
  const calculateSpainTax = (salary) => {
    // Calculate Social Security first (deductible from IRPF base)
    const ssBase = Math.min(salary, SPAIN_SS_MAX_BASE)
    const socialSecurity = ssBase * SPAIN_SS_RATE

    // Calculate net income after SS (for work reduction calculation)
    const netIncomeAfterSS = salary - socialSecurity

    // Calculate work reduction (variable based on income)
    const workReduction = calculateWorkReduction(netIncomeAfterSS)

    // Calculate taxable base: Gross - SS contributions - Work reduction
    const taxableBase = Math.max(0, salary - socialSecurity - workReduction)

    // Calculate IRPF on taxable base
    let grossTax = 0
    const taxBrackets = []

    SPAIN_TAX_BRACKETS.forEach((bracket) => {
      if (taxableBase > bracket.min) {
        const taxableInBracket = Math.min(taxableBase, bracket.max) - bracket.min
        const taxInBracket = taxableInBracket * bracket.rate

        if (taxableInBracket > 0) {
          grossTax += taxInBracket

          const rangeMax = bracket.max === Infinity ? '+' : bracket.max.toLocaleString('es-ES')
          taxBrackets.push({
            range: `€${bracket.min.toLocaleString('es-ES')} - €${rangeMax}`,
            rate: `${(bracket.rate * 100).toFixed(0)}%`,
            taxableAmount: taxableInBracket,
            taxPaid: taxInBracket,
            name: bracket.name
          })
        }
      }
    })

    // Apply personal minimum reduction (reduces final tax)
    // Mínimo personal is taxed at the first bracket rate and subtracted
    const personalMinimumCredit = SPAIN_PERSONAL_MINIMUM * 0.19
    const incomeTax = Math.max(0, grossTax - personalMinimumCredit)

    const totalDeductions = incomeTax + socialSecurity
    const netAnnual = salary - totalDeductions
    const netMonthly = netAnnual / 12
    const grossMonthly = salary / 12

    return {
      country: "spain",
      currency: "€",
      grossAnnual: salary,
      grossMonthly: grossMonthly,
      incomeTax: incomeTax,
      socialSecurity: socialSecurity,
      totalDeductions: totalDeductions,
      netAnnual: netAnnual,
      netMonthly: netMonthly,
      taxBrackets: taxBrackets
    }
  }

  // Handle input changes with validation
  const handleSalaryInput = (e) => {
    const value = e.target.value
    setGrossSalary(value)

    // Clear results when input changes
    setResults(null)

    // Validate input
    if (value === "") {
      setInputError("")
      return
    }

    const numValue = parseFloat(value)

    if (isNaN(numValue)) {
      setInputError("Please enter a valid number")
      return
    }

    if (numValue < 0) {
      setInputError("Salary must be positive")
      return
    }

    if (numValue > 10000000) {
      setInputError("Please enter a realistic salary")
      return
    }

    setInputError("")
  }

  // Handle calculate button click
  const handleCalculate = () => {
    const salary = parseFloat(grossSalary)

    if (isNaN(salary) || salary < 0) {
      return
    }

    if (activeTab === "uk") {
      setResults(calculateUKTax(salary))
    } else {
      setResults(calculateSpainTax(salary))
    }
  }

  // Handle tab switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab)

    // If there's a valid salary entered, recalculate for the new country
    const salary = parseFloat(grossSalary)
    if (!isNaN(salary) && salary > 0 && inputError === "") {
      if (tab === "uk") {
        setResults(calculateUKTax(salary))
      } else {
        setResults(calculateSpainTax(salary))
      }
    } else {
      setResults(null)
    }
  }

  // Format currency
  const formatCurrency = (value, country) => {
    if (country === "uk") {
      return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
    }
  }

  // Get text labels based on active tab
  const labels = activeTab === "uk" ? {
    grossLabel: "Gross Annual Salary",
    calculateButton: "Calculate",
    incomeTaxLabel: "Income Tax",
    socialSecurityLabel: "National Insurance",
    netAnnualLabel: "Net Annual",
    netMonthlyLabel: "Net Monthly",
    grossLabel: "Gross",
    deductionsLabel: "Deductions",
    tableHeaders: {
      bracket: "Bracket",
      rate: "Rate",
      taxed: "Amount Taxed",
      taxPaid: "Tax Paid"
    },
    resultsTitle: "Your Take-Home Pay",
    bracketsTitle: "Tax Breakdown by Bracket"
  } : {
    grossLabel: "Salario Bruto Anual",
    calculateButton: "Calcular",
    incomeTaxLabel: "IRPF",
    socialSecurityLabel: "Seguridad Social",
    netAnnualLabel: "Neto Anual",
    netMonthlyLabel: "Neto Mensual",
    grossLabel: "Bruto",
    deductionsLabel: "Deducciones",
    tableHeaders: {
      bracket: "Tramo",
      rate: "Tipo",
      taxed: "Base Imponible",
      taxPaid: "Impuesto"
    },
    resultsTitle: "Tu Salario Neto",
    bracketsTitle: "Desglose del IRPF por Tramos"
  }

  const isCalculateDisabled = grossSalary === "" || inputError !== ""

  return (
    <>
      <Head>
        <title>Income Tax Calculator - UK & Spain | Tirso Gallego</title>
        <meta name="description" content="Calculate take-home pay for UK and Spain with detailed tax breakdown for 2025/26 tax year." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {/* Back Button */}
          <Link href="/projects" className={styles.backButton}>
            ← Back to Projects
          </Link>

          {/* Project Header */}
          <div className={styles.projectHeader}>
            <div>
              <h1 className={styles.title}>
                Income Tax Calculator <span className={styles.icon}>💰</span>
              </h1>
              <p className={styles.subtitle}>
                Calculate take-home pay for UK and Spain with detailed tax breakdown
              </p>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "uk" ? styles.tabActiveUk : styles.tabInactive}`}
                onClick={() => handleTabSwitch("uk")}
              >
                🇬🇧 UK
              </button>
              <button
                className={`${styles.tab} ${activeTab === "spain" ? styles.tabActiveSpain : styles.tabInactive}`}
                onClick={() => handleTabSwitch("spain")}
              >
                🇪🇸 Spain
              </button>
            </div>
          </div>

          {/* Input Card */}
          <div className={styles.inputCard}>
            <label className={styles.inputLabel} htmlFor="salary">
              {labels.grossLabel}
            </label>
            <input
              id="salary"
              type="number"
              className={styles.input}
              placeholder={activeTab === "uk" ? "50000" : "30000"}
              value={grossSalary}
              onChange={handleSalaryInput}
              min="0"
              max="10000000"
              step="1000"
            />
            {inputError && (
              <p className={styles.errorText}>{inputError}</p>
            )}
            <button
              className={`${styles.calculateButton} ${activeTab === "uk" ? styles.calculateButtonUk : styles.calculateButtonSpain}`}
              onClick={handleCalculate}
              disabled={isCalculateDisabled}
            >
              {labels.calculateButton}
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <>
              {/* Results Summary */}
              <div className={styles.resultsCard}>
                <h2 className={styles.resultsTitle}>{labels.resultsTitle}</h2>

                <div className={styles.resultsGrid}>
                  {/* Gross */}
                  <div className={styles.resultItem}>
                    <div className={styles.resultLabel}>{labels.grossLabel}</div>
                    <div className={styles.resultValue}>
                      {formatCurrency(results.grossAnnual, results.country)}
                    </div>
                    <div className={styles.resultMonthly}>
                      {formatCurrency(results.grossMonthly, results.country)}/month
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className={styles.resultItem}>
                    <div className={styles.resultLabel}>{labels.deductionsLabel}</div>
                    <div className={`${styles.resultValue} ${styles.deductionValue}`}>
                      - {formatCurrency(results.totalDeductions, results.country)}
                    </div>
                    <div className={styles.deductionBreakdown}>
                      <div className={styles.deductionItem}>
                        <span>{labels.incomeTaxLabel}:</span>
                        <span>{formatCurrency(results.incomeTax, results.country)}</span>
                      </div>
                      <div className={styles.deductionItem}>
                        <span>{labels.socialSecurityLabel}:</span>
                        <span>{formatCurrency(results.socialSecurity, results.country)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Net */}
                  <div className={`${styles.resultItem} ${styles.netResult}`}>
                    <div className={styles.resultLabel}>{labels.netAnnualLabel}</div>
                    <div className={`${styles.resultValue} ${styles.netValue}`}>
                      {formatCurrency(results.netAnnual, results.country)}
                    </div>
                    <div className={styles.resultMonthly}>
                      {formatCurrency(results.netMonthly, results.country)}/month
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tax Brackets Table - Always Visible */}
          <div className={styles.bracketsCard}>
            <h3 className={styles.bracketsTitle}>{labels.bracketsTitle}</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.bracketsTable}>
                <thead>
                  <tr>
                    <th>{labels.tableHeaders.bracket}</th>
                    <th>{labels.tableHeaders.rate}</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "uk" ? (
                    UK_TAX_BRACKETS.map((bracket, index) => {
                      const rangeMax = bracket.max === Infinity ? '+' : `£${bracket.max.toLocaleString('en-GB')}`
                      return (
                        <tr key={index}>
                          <td>£{bracket.min.toLocaleString('en-GB')} - {rangeMax}</td>
                          <td>{(bracket.rate * 100).toFixed(0)}%</td>
                        </tr>
                      )
                    })
                  ) : (
                    SPAIN_TAX_BRACKETS.map((bracket, index) => {
                      const rangeMax = bracket.max === Infinity ? '+' : `€${bracket.max.toLocaleString('es-ES')}`
                      return (
                        <tr key={index}>
                          <td>€{bracket.min.toLocaleString('es-ES')} - {rangeMax}</td>
                          <td>{(bracket.rate * 100).toFixed(0)}%</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer - Always Visible */}
          <div className={styles.disclaimer}>
            <span className={styles.warningIcon}>⚠️</span>
            <p>
              {activeTab === "uk" ? (
                <>This calculator provides estimates for educational purposes only. UK rates assume England/Wales/NI (not Scotland). Does not include student loans, pension contributions, or personal allowance taper. Consult HMRC or a tax advisor for accurate calculations.</>
              ) : (
                <>Calculadora para Cantabria 2025. Incluye: cotizaciones SS deducibles, reducción por trabajo (fórmula completa), y mínimo personal (€5,550). Asume: 0 hijos, 0 gastos deducibles, trabajador por cuenta ajena. Puede haber variaciones de ~€300-500 vs calculadoras bancarias por diferencias en retenciones mensuales, método de cálculo de pagas extras, y redondeos. Para cálculos exactos consulta con un asesor fiscal.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
