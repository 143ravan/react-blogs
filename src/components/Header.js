import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {

  return (
    <header>
      <Link
        to='/'
        style={{position: 'fixed', top: 0, padding: '10px 16px', color: 'red', cursor: 'pointer', textDecoration: 'none'}}>
        Back
      </Link>
    </header>
  )
}
