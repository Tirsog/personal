import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Articlecard.module.css"

export default function ArticleCard({ post }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link href={`/articles/${post.slug}`}>
                    <Image
                        className={styles.image}
                        src={post.frontmatter.image}
                        width={300}
                        height={300}
                        alt={post.slug}
                    />
                </Link>
            </div>
            <Link href={`/articles/${post.slug}`}>
                <h2 className={styles.title}>
                    {post.frontmatter.title}
                </h2>
            </Link>
            <p className={styles.date}>
                Posted on {post.frontmatter.date}
            </p>
            <div>{post.frontmatter.description}</div>
        </div>
    )
}
