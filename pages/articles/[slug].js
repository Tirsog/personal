import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { marked } from "marked"
import Link from "next/link"
import Head from "next/head"
import styles from "../../styles/Article.module.css"

export default function PostPage({
    frontmatter: { title, description, date, image },
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

                {image && (
                    <div className={styles.imageContainer}>
                        <Image
                            src={image}
                            width={300}
                            height={300}
                            alt={slug}
                        ></Image>
                    </div>
                )}
                <div
                    className="parsed"
                    dangerouslySetInnerHTML={{ __html: marked(content) }}
                ></div>
                <div className={styles.date}>Posted on {date}</div>
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
