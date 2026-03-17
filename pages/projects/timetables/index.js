"use client"

import { useState } from "react"
import Head from "next/head"
import styles from "../../../styles/Timetables.module.css"

const TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const MULTIPLIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function Timetables() {
    const [showAnswers, setShowAnswers] = useState(true)

    const handlePrint = () => window.print()

    return (
        <>
            <Head>
                <title>Multiplication Timetables</title>
                <meta name="description" content="Printable multiplication timetables from 1 to 10" />
                <link rel="icon" href="/favicon.ico" />
                <style>{`
                    @media print {
                        header, footer, nav { display: none !important; }
                        html, body { height: auto !important; min-height: 0 !important; }
                        #__next, #__next > div { min-height: 0 !important; height: auto !important; }
                        main { flex: none !important; padding: 0 !important; margin: 0 !important; }
                    }
                `}</style>
            </Head>

            <div className={styles.controls}>
                <h1 className={styles.title}>Multiplication Tables</h1>
                <div className={styles.controlsRow}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={showAnswers}
                            onChange={(e) => setShowAnswers(e.target.checked)}
                        />
                        <span>Show answers</span>
                    </label>
                    <button className={styles.printBtn} onClick={handlePrint}>
                        Print / Save as PDF
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {TABLES.map((n) => (
                    <div key={n} className={styles.table}>
                        <div className={styles.tableTitle}>{n}× table</div>
                        <div className={styles.rows}>
                            {MULTIPLIERS.map((m) => (
                                <div key={m} className={styles.row}>
                                    {n} × {m} ={" "}
                                    {showAnswers ? n * m : null}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
