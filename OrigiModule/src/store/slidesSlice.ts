import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
//import data from 'data/data.json'
import { Painting } from 'models/painting'

import { parse } from 'rss-to-json'

//let data_rss = null
//let data_json = data

// async await ---
/*;(async function () {
  data_rss = await parse('http://localhost:5000/elsocialista', {
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  //data_json = JSON.stringify(data_rss, null, 3)
  data_json = data_rss.items.map(item => {
    return {
      name: String(item.title),
      link: String(item.link),
      year: Number(item.pubDate),
      description: String(item.description),
      source: String(item.link),
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
    }
  })
  console.log(data_json)
})()*/

type SlidesSlice = {
  slides: Painting[]
  direction: number
  currentSlideIndex: number
  isPlaying: boolean
}

const data_json2 = () => {
  let data_json2: Painting[] = [
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
  parse('http://localhost:5000/elsocialista', {
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(data_rss2 => {
    data_json2 = data_rss2.items.map(item => {
      return {
        name: String(item.title),
        year: Number(item.pubDate),
        description: String(item.description),
        source: String(item.link),
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
      }
    })
  })
  return data_json2
}

const initialSlidesState: SlidesSlice = {
  slides: data_json2(),
  direction: 0,
  currentSlideIndex: 0,
  isPlaying: false,
}

const slidesSlice = createSlice({
  name: 'slideshow',
  initialState: initialSlidesState,
  reducers: {
    setCurrentSlide: (state, action: PayloadAction<number>) => {
      state.currentSlideIndex = action.payload
    },
    paginate: (state, action: PayloadAction<number>) => {
      const direction = action.payload
      if (direction > 0) {
        state.currentSlideIndex =
          (state.currentSlideIndex + 1) % state.slides.length
      } else {
        state.currentSlideIndex =
          (state.currentSlideIndex - 1 + state.slides.length) %
          state.slides.length
      }
      state.direction = direction
    },
    toggleIsPlaying: state => {
      state.isPlaying = !state.isPlaying
    },
    resetSlider: state => {
      state.currentSlideIndex = 0
      state.direction = 0
      state.isPlaying = false
    },
  },
})

export const numberOfSlides = (state: RootState): number =>
  state.slideshow.slides.length

export const currentSlideIndex = (state: RootState): number =>
  state.slideshow.currentSlideIndex

export const currentSlide = (state: RootState): Painting =>
  state.slideshow.slides[state.slideshow.currentSlideIndex]

export const slidesDirection = (state: RootState): number =>
  state.slideshow.direction

export const isPlaying = (state: RootState): boolean =>
  state.slideshow.isPlaying

export const { paginate, setCurrentSlide, toggleIsPlaying, resetSlider } =
  slidesSlice.actions

export default slidesSlice.reducer
