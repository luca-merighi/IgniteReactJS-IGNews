import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '@/services/prismic'
import {RichText} from 'prismic-dom'

import styles from './styles.module.scss'

type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}

export default function Posts(props: PostsProps) {
    return (
        <React.Fragment>
            <Head>
                <title>IGNews | Posts</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {props.posts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </Link>))}
                </div>
            </main>
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType(
        "posts", {pageSize: 100}
    )

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.
                find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })
    
    console.log(response);
    
    return {
        props: { posts }
    }
}