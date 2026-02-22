import { useState, useEffect } from 'react'
import styles from './StarRating.module.css'

function calculateStars(correct, total) {
  const pct = correct / total
  if (pct >= 0.9) return 3
  if (pct >= 0.7) return 2
  if (pct >= 0.5) return 1
  return 0
}

export function StarRating({ correct, total, planetName, planetColor, bestStars, onContinue }) {
  const [revealedStars, setRevealedStars] = useState(0)
  const stars = calculateStars(correct, total)
  const isNewBest = stars > bestStars

  useEffect(() => {
    if (stars === 0) {
      setRevealedStars(0)
      return
    }
    const timers = []
    for (let i = 1; i <= stars; i++) {
      timers.push(setTimeout(() => setRevealedStars(i), i * 400))
    }
    return () => timers.forEach(clearTimeout)
  }, [stars])

  const messages = {
    0: 'Keep practising!',
    1: 'Good effort!',
    2: 'Great work!',
    3: 'Amazing!',
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.planetName} style={{ color: planetColor }}>
        {planetName}
      </h2>
      <p className={styles.score}>
        {correct} out of {total} correct
      </p>

      <div className={styles.starsRow}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`${styles.star} ${i < revealedStars ? styles.starEarned : styles.starEmpty}`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            ★
          </span>
        ))}
      </div>

      <p className={styles.message}>{messages[stars]}</p>

      {isNewBest && stars > 0 && (
        <p className={styles.newBest}>New personal best!</p>
      )}

      <button
        className={styles.continueBtn}
        onClick={() => onContinue(stars)}
        style={{ background: planetColor || '#3b82f6' }}
      >
        {stars === 0 ? 'Try Again' : 'Continue'}
      </button>
    </div>
  )
}

export { calculateStars }

export default function _() { return null }
