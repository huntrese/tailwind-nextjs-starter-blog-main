import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ tag: string; step?: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default async function TagPage(props: { 
  params: Promise<{ tag: string; step?: string }> 
}) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const step = params.step ? parseInt(params.step) : 1
  
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  const POSTS_PER_PAGE = 5
  const totalSteps = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (step - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const initialDisplayPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <ListLayout 
      posts={filteredPosts}
      title={title}
      initialDisplayPosts={initialDisplayPosts}
      pagination={{
        currentStep: step,
        totalSteps: totalSteps,
        tag: tag
      }}
    />
  )
}