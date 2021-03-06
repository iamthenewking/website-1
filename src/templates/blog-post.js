import React from 'react'
import { graphql } from 'gatsby'
import LongContent from '~components/common/long-content'
import AuthorFooter from '~components/pages/blog/author-footer'
import Categories from '~components/pages/blog/categories'
import Layout from '~components/layout'
import Lede from '~components/pages/blog/blog-lede'
import BlogPostContent from '~components/pages/blog/blog-content'

export default ({ data, path }) => {
  const blogPost = data.contentfulBlogPost
  const blogImages = {}
  data.allContentfulContentBlockImage.nodes.forEach(image => {
    blogImages[image.contentful_id] = image
  })
  const socialCard = blogPost.socialCard || { description: blogPost.lede.lede }
  return (
    <Layout
      title={`Blog | ${blogPost.title}`}
      displayTitle="Blog"
      socialCard={socialCard}
      returnLink="/blog"
      returnLinkTitle="All posts"
      path={path}
      narrow
    >
      <Categories categories={blogPost.categories} />
      <Lede
        headline={blogPost.title}
        authors={blogPost.authors}
        date={blogPost.publishDate}
        lede={blogPost.lede.lede}
        featuredImage={blogPost.featuredImage}
      />
      <LongContent>
        <BlogPostContent
          content={blogPost.childContentfulBlogPostBlogContentRichTextNode.json}
          images={blogImages}
        />
      </LongContent>

      <hr />
      <AuthorFooter authors={blogPost.authors} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!, $blogImages: [String]) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      authors {
        name
        twitterLink
        twitterHandle
        link
        childContentfulAuthorBiographyTextNode {
          childMarkdownRemark {
            html
          }
        }
        headshot {
          file {
            fileName
          }
          resize(width: 200) {
            width
            height
            src
          }
        }
      }
      socialCard {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
      categories {
        name
        slug
      }
      childContentfulBlogPostBlogContentRichTextNode {
        json
      }
      featuredImage {
        resize(width: 900) {
          src
        }
        title
      }
      slug
      lede {
        lede
      }
      publishDate(formatString: "MMMM D, YYYY")
      childContentfulBlogPostBodyTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulContentBlockImage(
      filter: { contentful_id: { in: $blogImages } }
    ) {
      nodes {
        contentful_id
        image {
          title
          fluid(maxWidth: 2000, sizes: "4") {
            aspectRatio
            sizes
            src
            srcSet
            tracedSVG
          }
        }
      }
    }
  }
`
