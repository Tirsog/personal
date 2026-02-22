"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ProfileSelect } from './components/ProfileSelect'
import { StarMap } from './components/StarMap'
import { ExerciseView } from './components/ExerciseView'
import { getTotalStars, createEmptyProgress } from './data/curriculum'
import { avatars } from './data/avatars'
import styles from './styles/MateLab.module.css'

const STORAGE_KEY = 'matelab_profiles'

function seededRand(seed) {
  let s = seed
  return function () {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function generateStars(count) {
  const rand = seededRand(42)
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      cx: (rand() * 100).toFixed(2),
      cy: (rand() * 100).toFixed(2),
      r: (0.04 + (i % 3) * 0.03).toFixed(3),
      delay: (rand() * 5).toFixed(1),
    })
  }
  return stars
}

function loadProfiles() {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveProfiles(profiles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  } catch {}
}

export default function MateLab() {
  const [screen, setScreen] = useState('profile')
  const [profiles, setProfiles] = useState([])
  const [activeProfile, setActiveProfile] = useState(null)
  const [activePlanet, setActivePlanet] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setProfiles(loadProfiles())
    setLoaded(true)
  }, [])

  const updateProfile = useCallback(
    (updatedProfile) => {
      const updated = profiles.map((p) =>
        p.id === updatedProfile.id ? updatedProfile : p
      )
      setProfiles(updated)
      setActiveProfile(updatedProfile)
      saveProfiles(updated)
    },
    [profiles]
  )

  function handleSelectProfile(profile) {
    setActiveProfile(profile)
    setScreen('starmap')
  }

  function handleCreateProfile(profile) {
    const updated = [...profiles, profile]
    setProfiles(updated)
    saveProfiles(updated)
    setActiveProfile(profile)
    setScreen('starmap')
  }

  function handleSelectPlanet(planet) {
    setActivePlanet(planet)
    setScreen('exercise')
  }

  function handleFinishExercise(topicKey, stars) {
    if (!activeProfile) return
    const progress = { ...activeProfile.progress }
    const yearProgress = { ...(progress.year2 || createEmptyProgress()) }
    const topicProgress = { ...(yearProgress[topicKey] || { bestStars: 0, attempts: 0, lastAttempt: null }) }

    topicProgress.attempts += 1
    topicProgress.lastAttempt = new Date().toISOString().split('T')[0]
    if (stars > topicProgress.bestStars) {
      topicProgress.bestStars = stars
    }

    yearProgress[topicKey] = topicProgress
    progress.year2 = yearProgress

    const updatedProfile = { ...activeProfile, progress }
    updateProfile(updatedProfile)
    setScreen('starmap')
  }

  function handleBackToMap() {
    setScreen('starmap')
  }

  function handleSwitchProfile() {
    setActiveProfile(null)
    setScreen('profile')
  }

  // TODO: Remove - temporary debug button
  function handleUnlockAll() {
    if (!activeProfile) return
    const progress = { ...activeProfile.progress }
    const yearProgress = { ...(progress.year2 || createEmptyProgress()) }
    Object.keys(yearProgress).forEach((key) => {
      yearProgress[key] = { bestStars: 3, attempts: 1, lastAttempt: new Date().toISOString().split('T')[0] }
    })
    progress.year2 = yearProgress
    updateProfile({ ...activeProfile, progress })
  }

  const bgStars = useMemo(() => generateStars(120), [])

  if (!loaded) return null

  const progress = activeProfile?.progress?.year2 || createEmptyProgress()
  const totalStars = activeProfile ? getTotalStars(progress) : 0
  const avatar = activeProfile ? avatars.find((a) => a.id === activeProfile.avatar) : null

  return (
    <>
      <Head>
        <title>MateLab - Tirso G.</title>
        <meta name="description" content="Space-themed gamified math learning for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <svg className={styles.starfield} viewBox="0 0 100 100" preserveAspectRatio="none">
          {bgStars.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="white"
              className={styles.bgStar}
              style={{ animationDelay: `${star.delay}s` }}
            />
          ))}
        </svg>
        <div className={styles.header}>
          {screen === 'profile' ? (
            <Link href="/projects" className={styles.backButton}>
              ← Projects
            </Link>
          ) : screen === 'starmap' ? (
            <>
              <button className={styles.backButton} onClick={handleSwitchProfile}>
                ← Switch Explorer
              </button>
              <button className={styles.backButton} onClick={handleUnlockAll}>
                Unlock All
              </button>
            </>
          ) : (
            <span />
          )}

          {activeProfile && screen !== 'profile' && (
            <div className={styles.profileInfo}>
              <span className={styles.profileAvatar}>{avatar?.emoji}</span>
              <span className={styles.profileName}>{activeProfile.name}</span>
              <span className={styles.profileStars}>{totalStars} ★</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          {screen === 'profile' && (
            <>
              <h1 className={styles.title}>MateLab</h1>
              <p className={styles.subtitle}>Space Math Adventure</p>
              <ProfileSelect
                profiles={profiles}
                onSelect={handleSelectProfile}
                onCreateProfile={handleCreateProfile}
              />
            </>
          )}

          {screen === 'starmap' && (
            <StarMap
              progress={progress}
              onSelectPlanet={handleSelectPlanet}
            />
          )}

          {screen === 'exercise' && activePlanet && (
            <ExerciseView
              planet={activePlanet}
              progress={progress}
              onFinish={handleFinishExercise}
              onBack={handleBackToMap}
            />
          )}
        </div>
      </div>
    </>
  )
}
