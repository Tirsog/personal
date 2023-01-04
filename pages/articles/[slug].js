import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { marked } from "marked"
import Link from "next/link"

export default function PostPage({
    frontmatter: { title, date, image },
    slug,
    content,
}) {
    return (
        <div className="pagecontainer">
            <h1>{title}</h1>
            <div>Posted on {date}</div>
            <Image src={image} width={500} height={500} alt={slug}></Image>
            <Link href="/articles">
                <button>Back</button>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
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
