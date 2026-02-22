import { useState } from 'react'
import { avatars } from '../data/avatars'
import { getTotalStars, createEmptyProgress } from '../data/curriculum'
import styles from './ProfileSelect.module.css'

export function ProfileSelect({ profiles, onSelect, onCreateProfile }) {
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  function handleCreate() {
    if (!name.trim() || !selectedAvatar) return
    onCreateProfile({
      id: 'profile_' + Date.now(),
      name: name.trim(),
      avatar: selectedAvatar,
      yearGroup: 'year2',
      progress: { year2: createEmptyProgress() },
    })
    setName('')
    setSelectedAvatar(null)
    setCreating(false)
  }

  if (creating) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>New Explorer</h2>
        <div className={styles.field}>
          <label className={styles.label}>What is your name?</label>
          <input
            className={styles.nameInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Choose your avatar</label>
          <div className={styles.avatarGrid}>
            {avatars.map((av) => (
              <button
                key={av.id}
                className={`${styles.avatarOption} ${selectedAvatar === av.id ? styles.avatarSelected : ''}`}
                onClick={() => setSelectedAvatar(av.id)}
                type="button"
              >
                <span className={styles.avatarEmoji}>{av.emoji}</span>
                <span className={styles.avatarLabel}>{av.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.createBtn}
            onClick={handleCreate}
            disabled={!name.trim() || !selectedAvatar}
          >
            Launch!
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setCreating(false)}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Who is exploring today?</h2>
      <div className={styles.profileGrid}>
        {profiles.map((profile) => {
          const avatar = avatars.find((a) => a.id === profile.avatar)
          const stars = getTotalStars(profile.progress.year2 || {})
          return (
            <button
              key={profile.id}
              className={styles.profileCard}
              onClick={() => onSelect(profile)}
            >
              <span className={styles.cardAvatar}>{avatar?.emoji || '👽'}</span>
              <span className={styles.cardName}>{profile.name}</span>
              <span className={styles.cardStars}>{stars} stars</span>
            </button>
          )
        })}
        <button
          className={styles.addCard}
          onClick={() => setCreating(true)}
        >
          <span className={styles.addIcon}>+</span>
          <span className={styles.addLabel}>Add Explorer</span>
        </button>
      </div>
    </div>
  )
}

export default function _() { return null }
