import Head from "next/head"
import styles from "../../styles/Articles.module.css"
import ArticlesList from "../../components/articleList/ArticlesList"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function Articles({ posts }) {
    return (
        <div>
            <Head>
                <title>Articles | Tirso G.</title>
                <meta
                    name="description"
                    content="A collection of random notes I've been taken. Some are articles some are just notes."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>Articles</h1>
                <ArticlesList posts={posts} />
            </div>
        </div>
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
