import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { marked } from "marked"
import Link from "next/link"
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
            <div className="mx-auto flex flex-col px-6 max-w-screen-xl">
                <h1 className="text-4xl font-bold flex justify-center p-4">
                    {title}
                </h1>

                <div className="flex justify-center py-3">
                    <Image
                        src={image}
                        width={300}
                        height={300}
                        alt={slug}
                    ></Image>
                </div>
                <div
                    className="parsed"
                    dangerouslySetInnerHTML={{ __html: marked(content) }}
                ></div>
                <div className="mx-auto py-3">Posted on {date}</div>
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
