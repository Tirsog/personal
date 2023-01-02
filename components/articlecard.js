import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Articlecard.module.css"

export default function ArticleCard({ post }) {
    return (
        <div className={styles.pagecontainer}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <Image
                        src={post.frontmatter.image}
                        width={100}
                        height={100}
                        alt={post.slug}
                    />
                </div>
                <Link href={`/articles/${post.slug}`}>
                    <h2>{post.frontmatter.title}</h2>
                </Link>
                <div className={styles.postedon}>
                    Posted on {post.frontmatter.date}
                </div>

                <div className={styles.description}>
                    {post.frontmatter.description}
                </div>
                <Link
                    className={styles.readmore}
                    href={`/articles/${post.slug}`}
                >
                    Read More
                </Link>
            </div>
        </div>
    )
}
