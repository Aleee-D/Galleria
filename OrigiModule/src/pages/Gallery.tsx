import styled from 'styled-components/macro'
import Macy from 'macy'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAsync } from 'react-async'

import queries from 'styles/breakpoints'
//import data from 'data/data.json'
import GalleryCard from 'components/molecules/GalleryCard'
import { pageAnimation, galleryAnimation } from 'utils/animations'
import { resetSlider } from 'store/slidesSlice'

import { Painting } from 'models/painting'
import { parse } from 'rss-to-json'

const FetchRss = async () => {
  const response_rss = await parse('http://localhost:5000/elsocialista', {
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if (!response_rss.title) throw new Error('fetch')
  return response_rss
}

const GetRss = () => {
  const { data, error } = useAsync({ promiseFn: FetchRss })

  if (data) {
    const data_json3 = data.items.map(item => {
      return {
        name: String(''),
        year: Number(item.pubDate),
        description: String(item.description),
        source: String(item.link),
        artist: {
          image: String(''),
          name: String(''),
        },
        images: {
          thumbnail: String(item.enclosures[0].url),
          hero: {
            small: String(''),
            large: String(''),
          },
          gallery: String(''),
        },
      }
    })
    console.log(data)
    return data_json3.map((painting, index) => {
      return <GalleryCard {...painting} id={index} key={index} />
    })
  } else {
    const aPainting: Painting[] = [
      {
        name: String(''),
        year: Number(''),
        description: String(''),
        source: String(''),
        artist: {
          image: String(''),
          name: String(''),
        },
        images: {
          thumbnail: String(''),
          hero: {
            small: String(''),
            large: String(''),
          },
          gallery: String(''),
        },
      },
    ]
    return aPainting.map((painting, index) => {
      return <GalleryCard {...painting} id={index} key={index} />
    })
  }
}

const Wrapper = styled(motion.main)`
  padding: 1.5rem;
  margin: 0 auto;
  max-width: var(--max-width);
  @media ${queries.tabletUp} {
    padding-top: 2.5rem;
  }
`

const List = styled(motion.ul)`
  margin: 0;

  img {
    width: 100%;
  }
`

const macyOptions = {
  container: '#macy-grid',
  trueOrder: true,
  mobileFirst: true,
  margin: 24,
  columns: 1,
  breakAt: {
    1000: 4,
    650: {
      margin: 40,
      columns: 2,
    },
  },
}

const Gallery = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSlider())
  }, [dispatch])

  useEffect(() => {
    new Macy(macyOptions)
  }, [])

  const myCards = GetRss()

  /*getRss().then(data => {
    myCards = data.map((painting, index) => {
      return <GalleryCard {...painting} id={index} key={index} />
    })
  })*/

  console.log(myCards)

  return (
    <Wrapper exit="exit" variants={pageAnimation} initial="hide" animate="show">
      <h1 className="sr-only">Main Gallery</h1>
      <List
        id="macy-grid"
        initial="hide"
        animate="show"
        variants={galleryAnimation}
      >
        {myCards}
      </List>
    </Wrapper>
  )
}

export default Gallery
