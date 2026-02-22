export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateDistractors(correct, count, min, max) {
  const distractors = new Set()
  const correctNum = Number(correct)
  let attempts = 0
  while (distractors.size < count && attempts < 100) {
    let d
    if (attempts < 20) {
      const offset = randInt(1, Math.max(3, Math.ceil(correctNum * 0.3) || 3))
      d = correctNum + (Math.random() < 0.5 ? offset : -offset)
    } else {
      d = randInt(min ?? 0, max ?? correctNum + 20)
    }
    d = Math.round(d)
    if (d !== correctNum && d >= (min ?? 0) && d <= (max ?? 999) && !distractors.has(d)) {
      distractors.add(d)
    }
    attempts++
  }
  while (distractors.size < count) {
    distractors.add(correctNum + distractors.size + 1)
  }
  return [...distractors]
}

export function mcq(prompt, correct, distractors, visual) {
  const options = shuffleArray([String(correct), ...distractors.map(String)])
  return {
    type: 'multipleChoice',
    prompt,
    options,
    correctAnswer: String(correct),
    visual: visual || null,
  }
}

export function numQ(prompt, correct, visual) {
  return {
    type: 'numberInput',
    prompt,
    options: null,
    correctAnswer: String(correct),
    visual: visual || null,
  }
}

export function tfQ(prompt, correct, visual) {
  return {
    type: 'trueFalse',
    prompt,
    options: null,
    correctAnswer: correct ? 'True' : 'False',
    visual: visual || null,
  }
}

export function dedupe(questions) {
  const seen = new Set()
  return questions.filter((q) => {
    if (seen.has(q.prompt)) return false
    seen.add(q.prompt)
    return true
  })
}

export function pickAndShuffle(generators, count = 10) {
  const all = []
  let safety = 0
  while (all.length < count + 5 && safety < 50) {
    const gen = generators[safety % generators.length]
    all.push(gen())
    safety++
  }
  return shuffleArray(dedupe(all)).slice(0, count)
}

export default function _() { return null }
