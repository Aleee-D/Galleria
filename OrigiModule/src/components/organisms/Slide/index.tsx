import queries from 'styles/breakpoints'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { ReactComponent as IconView } from 'assets/shared/icon-view-image.svg'
import {
  currentSlideIndex,
  currentSlide,
  slidesDirection,
} from 'store/slidesSlice'
import { openLightBox } from 'store/lightboxSlice'
import {
  Article,
  ArtistImageDesktop,
  ArtistImage,
  Button,
  Body,
  Caption,
  Description,
  Figure,
  Header,
  Link,
} from './Slide.styles'
import { slideAnimation } from 'utils/animations'

const Slide = (): JSX.Element => {
  const currentIndex = useSelector(currentSlideIndex)
  const direction = useSelector(slidesDirection)
  const current = useSelector(currentSlide)
  const dispatch = useDispatch()

  console.log(current)
  return (
    <AnimatePresence initial={false} custom={direction}>
      <Article
        key={currentIndex}
        custom={direction}
        variants={slideAnimation}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <Header>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <picture>
              <source
                media={queries.tabletUp}
                srcSet={current.images.hero.large}
              />
              <img src={current.images.hero.small} alt="" />
            </picture>
            {current.name.length > 1 && (
              <Caption>
                <h1>{current.name}</h1>
                <p>{current.artist.name}</p>
                <ArtistImage>
                  <img src={current.artist.image} alt="" />
                </ArtistImage>
              </Caption>
            )}
            {current.artist.image.length > 1 && (
              <ArtistImageDesktop>
                <img src={current.artist.image} alt="" />
              </ArtistImageDesktop>
            )}
            <Button onClick={() => dispatch(openLightBox())}>
              <IconView />
              <span>Ver imagen</span>
            </Button>
          </Figure>
        </Header>
        {1 > 0 && (
          <Body year="">
            <b>{current.year}</b>
            <Description>{current.description}</Description>
            <Link
              href={current.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer la nota completa
            </Link>
          </Body>
        )}
      </Article>
    </AnimatePresence>
  )
}

export default Slide
