"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { shapes } from "../../../components/paperShapes/shapes"
import NetRenderer from "./NetRenderer"
import styles from "./PaperShapes.module.css"

export default function PaperShapes() {
  const [selectedId, setSelectedId] = useState(shapes[0].id)
  const selected = shapes.find((s) => s.id === selectedId)

  return (
    <>
      <Head>
        <title>3D Paper Shapes - Printable Geometric Nets</title>
        <meta
          name="description"
          content="Printable geometric nets with fold lines and glue tabs. Print on A4, cut, fold, and assemble 3D shapes."
        />
        <style>{`
          @media print {
            nav, footer, header { display: none !important; }
            @page { size: A4; margin: 0; }
          }
        `}</style>
      </Head>

      <div className={styles.container}>
        <Link href="/projects" className={styles.backButton}>
          &larr; Back to Projects
        </Link>

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>&#x1F4D0;</span>
            <h1 className={styles.title}>3D Paper Shapes</h1>
          </div>
          <p className={styles.subtitle}>
            Printable geometric nets with fold lines and glue tabs. Select a
            shape, then print on A4 paper to cut, fold, and assemble.
          </p>
        </div>

        <div className={styles.selectorGrid}>
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={
                shape.id === selectedId
                  ? styles.shapeCardActive
                  : styles.shapeCard
              }
              onClick={() => setSelectedId(shape.id)}
            >
              <div className={styles.shapeCardIcon}>{shape.icon}</div>
              <p className={styles.shapeCardName}>{shape.name}</p>
            </div>
          ))}
        </div>

        <div className={styles.previewSection}>
          <div className={styles.previewContainer}>
            <NetRenderer shape={selected} />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.printButton}
            onClick={() => window.print()}
          >
            Print Net
          </button>
        </div>

        <div className={styles.instructions}>
          <h3>Instructions</h3>
          <ul className={styles.instructionsList}>
            <li>
              <span className={styles.legendSolid} />
              <span>
                <strong>Solid lines</strong> &mdash; cut along these
              </span>
            </li>
            <li>
              <span className={styles.legendDashed} />
              <span>
                <strong>Dashed lines</strong> &mdash; fold along these
              </span>
            </li>
            <li>
              <span className={styles.legendTab} />
              <span>
                <strong>Gray tabs</strong> &mdash; apply glue and attach to
                matching edge
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.printArea}>
        <NetRenderer shape={selected} printMode />
      </div>
    </>
  )
}
