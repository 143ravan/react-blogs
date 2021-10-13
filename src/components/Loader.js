import React from 'react'
import './../assets/utilities.scss';
const spinner = require('./../assets/images/spinner.gif').default

export default function Loader() {
  return (
    <section className="flex jc-center">
      <img style={{height: '60px', marginTop: '10px'}} src={spinner} alt="loader"/>
    </section>
  )
}

