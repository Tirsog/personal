import Link from "next/link"
import styles from "./ArticlesList.module.css"

export default function ArticlesList({ posts }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Latest thoughts</h2>
            <ul className={styles.list}>
                {posts.map((post) => (
                    <li key={post.slug} className={styles.listItem}>
                        <Link
                            href={`/articles/${post.slug}`}
                            className={styles.link}
                        >
                            <span className={styles.date}>
                                {post.frontmatter.date}
                            </span>
                            <span className={styles.title}>
                                {post.frontmatter.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
