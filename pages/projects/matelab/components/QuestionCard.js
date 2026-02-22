import { useState } from 'react'
import { VisualQuestion } from './VisualQuestion'
import { NumberPad } from './NumberPad'
import styles from './QuestionCard.module.css'

export function QuestionCard({ question, onAnswer, planetColor }) {
  const [numInput, setNumInput] = useState('')
  const [feedback, setFeedback] = useState(null)

  function handleAnswer(answer) {
    if (feedback) return
    const isCorrect = String(answer).trim() === String(question.correctAnswer).trim()
    setFeedback({ isCorrect, selected: answer })

    setTimeout(() => {
      setFeedback(null)
      setNumInput('')
      onAnswer(isCorrect)
    }, 1500)
  }

  const showingFeedback = feedback !== null

  return (
    <div className={styles.card}>
      {question.visual && <VisualQuestion visual={question.visual} />}

      <p className={styles.prompt}>{question.prompt}</p>

      {showingFeedback && (
        <div className={`${styles.feedback} ${feedback.isCorrect ? styles.correct : styles.incorrect}`}>
          {feedback.isCorrect ? 'Correct!' : `Answer: ${question.correctAnswer}`}
        </div>
      )}

      {question.type === 'multipleChoice' && (
        <div className={styles.optionsGrid}>
          {question.options.map((opt, i) => {
            let optClass = styles.option
            if (showingFeedback) {
              if (String(opt) === String(question.correctAnswer)) {
                optClass += ' ' + styles.optionCorrect
              } else if (String(opt) === String(feedback.selected)) {
                optClass += ' ' + styles.optionWrong
              } else {
                optClass += ' ' + styles.optionDim
              }
            }
            return (
              <button
                key={i}
                className={optClass}
                onClick={() => handleAnswer(opt)}
                disabled={showingFeedback}
                style={{ '--planet-color': planetColor }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'trueFalse' && (
        <div className={styles.trueFalseRow}>
          {['True', 'False'].map((opt) => {
            let optClass = styles.tfButton
            if (showingFeedback) {
              if (opt === question.correctAnswer) {
                optClass += ' ' + styles.optionCorrect
              } else if (opt === feedback.selected) {
                optClass += ' ' + styles.optionWrong
              } else {
                optClass += ' ' + styles.optionDim
              }
            }
            return (
              <button
                key={opt}
                className={optClass}
                onClick={() => handleAnswer(opt)}
                disabled={showingFeedback}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'numberInput' && !showingFeedback && (
        <NumberPad
          value={numInput}
          onChange={setNumInput}
          onSubmit={handleAnswer}
        />
      )}
    </div>
  )
}

export default function _() { return null }
