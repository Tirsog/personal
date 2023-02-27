import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ArticleCard from "/components/articlecard"

export default function Articles({ posts }) {
    return (
        <div className="articles">
            <Head>
                <title>Articles | Tirso G.</title>
                <meta
                    name="description"
                    content="A collection of random notes I've been taken. Some are articles some are just notes."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto p-4 max-w-screen-xl">
                <h1 className="py-6 text-4xl font-bold flex justify-center">
                    Articles and other stuff I have written
                </h1>
                <div className="flex flex-wrap">
                    {posts.map((post, index) => (
                        <ArticleCard post={post} key={post.slug} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // Get files from the posts directory
    const files = fs.readdirSync(path.join("posts"))
    // Get slkuf and frontmatter from posts
    const posts = files.map((filename) => {
        // Create slug and replace .md extension
        const slug = filename.replace(".md", "")
        // Get frontmatter (Content of the MD)
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

    return {
        props: { posts: posts },
    }
}
