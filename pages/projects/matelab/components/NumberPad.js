import styles from './NumberPad.module.css'

export function NumberPad({ value, onChange, onSubmit }) {
  function handleDigit(digit) {
    if (value.length < 5) {
      onChange(value + digit)
    }
  }

  function handleBackspace() {
    onChange(value.slice(0, -1))
  }

  return (
    <div className={styles.pad}>
      <div className={styles.display}>
        <span className={styles.displayText}>
          {value || <span className={styles.placeholder}>?</span>}
        </span>
      </div>
      <div className={styles.keys}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <button
            key={d}
            className={styles.key}
            onClick={() => handleDigit(String(d))}
            type="button"
          >
            {d}
          </button>
        ))}
        <button
          className={`${styles.key} ${styles.backspace}`}
          onClick={handleBackspace}
          type="button"
        >
          ←
        </button>
        <button
          className={styles.key}
          onClick={() => handleDigit('0')}
          type="button"
        >
          0
        </button>
        <button
          className={`${styles.key} ${styles.submit}`}
          onClick={() => value && onSubmit(value)}
          disabled={!value}
          type="button"
        >
          ✓
        </button>
      </div>
    </div>
  )
}

export default function _() { return null }
