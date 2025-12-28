import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import Head from "next/head"
import styles from "../../styles/Article.module.css"

export default function PostPage({
    frontmatter: { title, description, date },
    slug,
    content,
}) {
    return (
        <>
            <Head>
                <title>{`${title} | Tirso G.`}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.date}>{date}</div>
                <div
                    className="parsed"
                    dangerouslySetInnerHTML={{ __html: marked(content) }}
                ></div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"))
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".md", ""),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join("posts", slug + ".md"),
        "utf-8"
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}
