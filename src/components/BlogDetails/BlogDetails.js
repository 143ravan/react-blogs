import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser'

import './../../assets/utilities.scss';
import './BlogDetails.scss';

export default function BlogDetails() {
  const params = useParams()

  useEffect(() => {
    fetchBlogDetails()
  }, [])

  const [blogDetails, setBlogDetails] = useState({})

  const fetchBlogDetails = async() => {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/slug:${params.slug}?fields=featured_image,title,author,content,date`
    const rawData = await fetch(url)
    const blogData = await rawData.json()
    setBlogDetails(blogData)
  }

  return (
    <section className="blog-details">
      {blogDetails && blogDetails.featured_image &&
      <img
        src={blogDetails.featured_image}
        className="blog-details--image"
        alt="featured_image" />
      }
      <div className="blog-details--content">
        <div className="title font-weight-bold">
          { blogDetails.title }
        </div>
        <div className="flex m-t-10">
          <div>
           {
             blogDetails.featured_image &&
            <img
              src={blogDetails.featured_image}
              className="blog-details--content__avatar"
              alt="author" />
           }
          </div>
          <div className="blog-details--content__profile">
            <div className="blog-details--content__name font-20">
              { blogDetails.author &&  blogDetails.author.name }
            </div>
            <div className="m-t-5">
              { blogDetails.date && new Date(blogDetails.date).toISOString().substring(0, 10) }
            </div>
          </div>
        </div>
        <div className="post-content">{ blogDetails.content && parse(blogDetails.content) }</div>
      </div>
    </section>
  )
}
