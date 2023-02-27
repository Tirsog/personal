import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Articlecard.module.css"

export default function ArticleCard({ post }) {
    return (
        <div className="max-w-md p-4 hover:shadow-2xl m-2 rounded">
            <div className="flex justify-center py-5">
                <Link href={`/articles/${post.slug}`}>
                    <Image
                        className="rounded"
                        src={post.frontmatter.image}
                        width={300}
                        height={300}
                        alt={post.slug}
                    />
                </Link>
            </div>
            <Link href={`/articles/${post.slug}`}>
                <h2 className="text-xl text-center">
                    {post.frontmatter.title}
                </h2>
            </Link>
            <p className="text-right text-xs font-bold py-2">
                Posted on {post.frontmatter.date}
            </p>
            <div>{post.frontmatter.description}</div>
        </div>
    )
}
