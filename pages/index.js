import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Index.module.css"
import Link from "next/link"
import ContactForm from "../components/contactForm/ContactForm"
import ArticlesList from "../components/articleList/ArticlesList"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <title>Tirso</title>
                <meta name="description" content="Tirso's Personal page" />
                <meta
                    name="keywords"
                    content="product management, proyect management, trademarks, marketing"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.sectionInner}>
                        <div className={styles.intro}>
                            <p className={styles.bio}>
                                I'm Tirso, a product-focused builder working at
                                the intersection of technology, marketing, and
                                business. I run and grow{" "}
                                <a
                                    href="https://igerent.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    iGerent
                                </a>
                                , where I work on product design, automation,
                                and growth to make international trademark
                                protection clearer and more efficient.
                            </p>

                            <p className={styles.description}>
                                This site is my personal space to think out
                                loud, share ideas, and document projects that
                                sit beyond the day-to-day work at{" "}
                                <a
                                    href="https://igerent.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    iGerent
                                </a>
                                .
                            </p>
                        </div>

                        <div>
                            <ArticlesList posts={posts} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export async function getStaticProps() {
    const files = fs.readdirSync(path.join("posts"))
    const posts = files
        .map((filename) => {
            const slug = filename.replace(".md", "")
            const markdownWithMeta = fs.readFileSync(
                path.join("posts", filename),
                "utf-8"
            )
            const { data: frontmatter } = matter(markdownWithMeta)

            return {
                slug,
                frontmatter,
            }
        })
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.date)
            const dateB = new Date(b.frontmatter.date)
            return dateB - dateA // Newest first
        })

    return {
        props: { posts },
    }
}
