import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard';
import './../../assets/utilities.scss';
import './Blogs.scss';

export default function Blogs() {

  const [cardList, setCardList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [category , setCategory] = useState('')

  useEffect(() => {
    fetchCardList()
  }, [category])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCardList = async() => {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?fields=slug,categories,post_thumbnail,title,date&category=${category}`
    const rawData = await fetch(url)
    const list = await rawData.json()
    setCardList(list.posts)
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

  return (
    <article className="blog">
      <div className="blog--header">
        <div className="blog--header__title flex jc-center align-center font-40 font-weight-bold">
          <span>The TrueCaller Blog</span>
        </div>
        <img
          src="@/assets/images/header.png"
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
        <div className="blog--articles__card">
          { cardList.map(card => <BlogCard key={card.slug} card={card} />) }
        </div>
        <div className="blog--articles__pagination flex jc-around font-weight-bold m-t-20">
          {/* <jw-pagination :items="totalPost" @changePage="onChangePage" :labels="customLabels" /> */}
        </div>
      </div>
    </article>
  )
}
