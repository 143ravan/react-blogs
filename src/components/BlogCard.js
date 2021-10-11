import React from 'react'
import './BlogCard.scss';

export default function BlogCard(props) {
  return (
    <section className="blog-card">
      <div className="padding-20 font-weight-bold font-14">
        {Object.keys(props.card.categories)[0]}
      </div>
      <img
        src={props.card?.post_thumbnail?.URL}
        alt="post_thumbnail"
        className="blog-card--avatar" />
      <div className="padding-20">
        <div className="font-18">
          { props.card.title }
        </div>
        <div className="posted font-12 m-t-10 m-t-10">
          { props.card.date }
        </div>
      </div>
    </section>
  )
}
