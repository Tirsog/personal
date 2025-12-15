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
                <title>Tirso G.</title>
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
                        <h1 className={styles.title}>Tirso's Stuff</h1>
                        <p className={styles.description}>
                            <Link className={styles.link} href="/bees">
                                Go to Bees
                            </Link>
                        </p>
                        <div className={styles.container}>
                            <ArticlesList posts={posts} />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <ContactForm />
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
