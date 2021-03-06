import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import HeroHeader from '~components/common/landing-page/hero/header'
import HeroText from '~components/common/landing-page/hero/text'
import headerHeroStyle from './header-hero.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/crdt-landing-header.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#FFAD4A" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <div className={headerHeroStyle.hero}>
      <Container>
        <Row>
          <Col width={[4, 4, 7]} paddingRight={[8, 0, 32]}>
            <HeroHeader>
              COVID-19 is affecting people of color the most. We’re tracking the
              data in real time.
            </HeroHeader>
            <HeroText>
              The COVID Racial Data Tracker is a collaboration between the COVID
              Tracking Project and the Antiracist Research &amp; Policy Center.
              Together, we&#8217;re gathering the most complete race and
              ethnicity data on COVID-19 in the United States.
            </HeroText>
          </Col>
          <Col width={[4, 2, 5]}>
            <Img
              fluid={data.file.childImageSharp.fluid}
              alt=""
              aria-hidden
              className={headerHeroStyle.image}
            />
            <span className={headerHeroStyle.credit}>
              Júlia Ledur / COVID Tracking Project
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
