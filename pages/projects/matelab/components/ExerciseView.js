import { useState, useMemo } from 'react'
import { generateQuestions } from '../generators/index'
import { ProgressBar } from './ProgressBar'
import { QuestionCard } from './QuestionCard'
import { StarRating, calculateStars } from './StarRating'
import styles from './ExerciseView.module.css'

export function ExerciseView({ planet, progress, onFinish, onBack }) {
  const questions = useMemo(() => generateQuestions(planet.key, 10), [planet.key])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const bestStars = progress[planet.key]?.bestStars || 0

  function handleAnswer(isCorrect) {
    const newCorrect = isCorrect ? correctCount + 1 : correctCount
    if (isCorrect) setCorrectCount(newCorrect)

    if (currentIdx + 1 >= questions.length) {
      setTimeout(() => setFinished(true), 200)
      if (isCorrect) setCorrectCount(newCorrect)
    } else {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 200)
    }
  }

  function handleContinue(stars) {
    onFinish(planet.key, stars)
  }

  if (finished) {
    return (
      <StarRating
        correct={correctCount}
        total={questions.length}
        planetName={planet.name}
        planetColor={planet.color}
        bestStars={bestStars}
        onContinue={handleContinue}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.quitBtn} onClick={onBack}>
          ✕ Quit
        </button>
        <h3 className={styles.planetLabel} style={{ color: planet.color }}>
          {planet.name}
        </h3>
      </div>

      <ProgressBar
        current={currentIdx + 1}
        total={questions.length}
        planetColor={planet.color}
      />

      {questions[currentIdx] && (
        <QuestionCard
          key={currentIdx}
          question={questions[currentIdx]}
          onAnswer={handleAnswer}
          planetColor={planet.color}
        />
      )}
    </div>
  )
}

export default function _() { return null }
