import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Projects.module.css"

export default function Projects() {
    const projects = [
        {
            slug: "bees",
            title: "UK Beekeeper's Calendar",
            description:
                "A seasonal guide for beekeepers in the UK, tracking key tasks and activities throughout the year.",
            icon: "🐝",
        },
    ]

    return (
        <>
            <Head>
                <title>Projects - Tirso G.</title>
                <meta
                    name="description"
                    content="Projects by Tirso García"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>Projects</h1>
                <p className={styles.description}>
                    A collection of personal projects, experiments, and side
                    ventures.
                </p>

                <div className={styles.projectsList}>
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/${project.slug}`}
                            className={styles.projectCard}
                        >
                            <div className={styles.projectContent}>
                                <h2 className={styles.projectTitle}>
                                    {project.title}
                                </h2>
                                <p className={styles.projectDescription}>
                                    {project.description}
                                </p>
                            </div>
                            <div className={styles.projectIcon}>
                                {project.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
