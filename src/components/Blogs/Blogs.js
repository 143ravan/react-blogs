import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard';
import Loader from '../Loader';
import './../../assets/utilities.scss';
import './Blogs.scss';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

const logo = require('./../../assets/images/header.jpg').default

export default function Blogs() {

  const [cardList, setCardList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [category , setCategory] = useState('')
  const [hasMoreCards, setHasMoreCards] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchCardList(1)
  }, [category])

  useEffect(() => {
    fetchCategories()
    window.scrollTo(0, 0)
  }, [])

  const fetchCardList = async(page) => {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?fields=slug,categories,post_thumbnail,title,date&category=${category}&page=${page}`
    const rawData = await fetch(url)
    const list = await rawData.json()
    setCardList(list.posts)
    setHasMoreCards(categoryList.length < list.found)
    setPage(page + 1)
  }

  const fetchCategories = async() => {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories`
    const rawData = await fetch(url)
    const list = await rawData.json()
    setCategoryList(list.categories)
  }

  const filterBlogs = (event) => {
    setCategory(event.target.value)
  }
  const fetchMoreData = async() => {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?fields=slug,categories,post_thumbnail,title,date&category=${category}&page=${page}`
    const rawData = await fetch(url)
    const list = await rawData.json()
    setCardList(cardList.concat(list.posts))
    setHasMoreCards(categoryList.length < list.found)
    setPage(page + 1)
  }

  return (
    <article className="blog">
      <div className="blog--header">
        <div className="blog--header__title flex jc-center align-center font-40 font-weight-bold">
          <span>The TrueCaller Blog</span>
        </div>
        <img
          src={logo}
          alt="header"
          className="blog--header__image"
        />
      </div>
      <div className="blog--articles">
        <div className="blog--articles__title font-weight-bold">
          Latest articles
        </div>
        <div className="blog--articles__filter font-weight-bold">
          <select
            className="select-box font-16 font-weight-bold padding-20"
            id="categories"
            onChange={filterBlogs}>
            <option
              value="all-categories">
              All Categories
            </option>
            {categoryList.map(category => <option key={category.slug} value={category.name}>{category.name}</option>)}
          </select>
        </div>
        <InfiniteScroll
          dataLength={cardList.length}
          next={fetchMoreData}
          hasMore={hasMoreCards}
          loader={<Loader />}>
          <div className="blog--articles__card">
            { cardList.map(card => <Link key={card.slug}  to={`/blog-details/${card.slug}`}><BlogCard card={card}  /></Link>) }
          </div>
        </InfiniteScroll>
      </div>
    </article>
  )
}
