import React from 'react'
import { Image } from 'react-bootstrap';
import PageNotFoundImg from '../assets/404.svg'

function PageNotFound() {
  return (
    <div className="page-not-found">
      <Image src={PageNotFoundImg} />
      <p>Page Not Found</p>
    </div>
  )
}

export default PageNotFound