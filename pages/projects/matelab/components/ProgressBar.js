import styles from './ProgressBar.module.css'

export function ProgressBar({ current, total, planetColor }) {
  const pct = ((current) / total) * 100

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, backgroundColor: planetColor || '#3b82f6' }}
        />
      </div>
      <span className={styles.label}>{current} / {total}</span>
    </div>
  )
}

export default function _() { return null }
