"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "./WorldClock.module.css"

const UK_TZ = "Europe/London"

const ZONES = [
    {
        id: "argentina",
        label: "Argentina",
        city: "Buenos Aires",
        timezone: "America/Argentina/Buenos_Aires",
        flag: "🇦🇷",
    },
    {
        id: "spain",
        label: "Spain",
        city: "Madrid",
        timezone: "Europe/Madrid",
        flag: "🇪🇸",
    },
    {
        id: "poland",
        label: "Poland",
        city: "Warsaw",
        timezone: "Europe/Warsaw",
        flag: "🇵🇱",
    },
    {
        id: "usa",
        label: "United States",
        city: "New York · Citibank CS",
        timezone: "America/New_York",
        flag: "🇺🇸",
    },
]

function formatTime(date, timezone, showSeconds = true) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        ...(showSeconds ? { second: "2-digit" } : {}),
        hour12: false,
    }).format(date)
}

function formatDate(date, timezone) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date)
}

function getUTCOffsetMinutes(date, timezone) {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        timeZoneName: "shortOffset",
    }).formatToParts(date)
    const tzPart =
        parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT"
    const match = tzPart.match(/GMT([+-])(\d+)(?::(\d+))?/)
    if (!match) return 0
    const sign = match[1] === "+" ? 1 : -1
    return sign * (parseInt(match[2], 10) * 60 + parseInt(match[3] ?? "0", 10))
}

function getOffsetLabel(date, toTz) {
    const fromOffset = getUTCOffsetMinutes(date, UK_TZ)
    const toOffset = getUTCOffsetMinutes(date, toTz)
    const diff = toOffset - fromOffset
    if (diff === 0) return "Same as UK"
    const sign = diff > 0 ? "+" : "-"
    const absH = Math.floor(Math.abs(diff) / 60)
    const absM = Math.abs(diff) % 60
    if (absM === 0) return `${sign}${absH}h`
    return `${sign}${absH}h ${absM}m`
}

function getDayDiff(date, toTz) {
    const fmt = (tz) =>
        new Intl.DateTimeFormat("en-CA", {
            timeZone: tz,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(date)
    const ukDate = fmt(UK_TZ)
    const toDate = fmt(toTz)
    if (ukDate === toDate) return null
    return toDate > ukDate ? "Tomorrow" : "Yesterday"
}

export default function WorldClock() {
    const [now, setNow] = useState(null)

    useEffect(() => {
        setNow(new Date())
        const id = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    return (
        <>
            <Head>
                <title>World Clock - Tirso G.</title>
                <meta
                    name="description"
                    content="Personal timezone dashboard showing local times across UK, Spain, Poland, Argentina and the US with DST support."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <Link href="/projects" className={styles.backButton}>
                    ← Back to Projects
                </Link>

                {/* UK – local time hero */}
                <div className={styles.localClock}>
                    <div className={styles.localHeader}>
                        <span className={styles.localFlag}>🇬🇧</span>
                        <span className={styles.localLabel}>
                            United Kingdom · London
                        </span>
                    </div>
                    <div className={styles.localTime}>
                        {now ? formatTime(now, UK_TZ, false) : "--:--"}
                    </div>
                    <div className={styles.localDate}>
                        {now ? formatDate(now, UK_TZ) : "\u00A0"}
                    </div>
                </div>

                {/* Other timezone cards */}
                <div className={styles.cardsGrid}>
                    {ZONES.map((zone) => {
                        const time = now
                            ? formatTime(now, zone.timezone, false)
                            : "--:--"
                        const offsetLabel = now
                            ? getOffsetLabel(now, zone.timezone)
                            : ""
                        const dayDiff = now
                            ? getDayDiff(now, zone.timezone)
                            : null
                        const isAhead = offsetLabel.startsWith("+")
                        const isBehind = offsetLabel.startsWith("-")

                        return (
                            <div key={zone.id} className={styles.card}>
                                <span className={styles.cardFlag}>
                                    {zone.flag}
                                </span>
                                <div className={styles.cardMeta}>
                                    <div className={styles.cardLabel}>
                                        {zone.label}
                                    </div>
                                    <div className={styles.cardCity}>
                                        {zone.city}
                                    </div>
                                </div>
                                <div className={styles.cardRight}>
                                    <div className={styles.cardTime}>
                                        {time}
                                    </div>
                                    <div
                                        className={`${styles.cardOffset} ${
                                            isAhead
                                                ? styles.ahead
                                                : isBehind
                                                ? styles.behind
                                                : styles.same
                                        }`}
                                    >
                                        {dayDiff
                                            ? `${offsetLabel} · ${dayDiff}`
                                            : `${offsetLabel} from UK`}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <p className={styles.dstNote}>
                    Daylight saving time is handled automatically — offsets
                    update the moment any clock changes. Argentina does not
                    observe DST.
                </p>
            </div>
        </>
    )
}
