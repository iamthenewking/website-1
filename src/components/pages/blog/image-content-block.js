import React from 'react'
import Img from 'gatsby-image'
import ImageCredit from '~components/common/image-credit'

export default ({ caption, image }) => (
  <div>
    <Img fluid={image.fluid} alt={image.title} />
    {caption && <ImageCredit>{caption['en-US']}</ImageCredit>}
  </div>
)
