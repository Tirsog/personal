import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { marked } from "marked"
import Link from "next/link"
import styles from "../../styles/Article.module.css"
import Head from "next/head"

export default function PostPage({
    frontmatter: { title, description, date, image },
    slug,
    content,
}) {
    return (
        <>
            <Head>
                <title>{title} | Tirso G.</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="pagecontainer">
                <h1 className={styles.header}>{title}</h1>
                <div className={styles.date}>Posted on {date}</div>
                <div className={styles.image}>
                    <Image
                        src={image}
                        width={300}
                        height={300}
                        alt={slug}
                    ></Image>
                </div>
                <div
                    className={styles.body}
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
