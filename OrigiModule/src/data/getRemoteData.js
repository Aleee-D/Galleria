import { useAsync } from 'react-async'
import { parse } from 'rss-to-json'
import GalleryCard from 'components/molecules/GalleryCard'
import { getAllJSDocTags } from 'typescript'
import HTMLparse from 'html-react-parser'

let dataLib

async function FetchRss() {
  const response_rss = await parse('http://localhost:5000/elsocialista', {
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if (!response_rss.title) throw new Error('fetch')
  return response_rss
}

function GetRss() {
  const { data, error } = useAsync({ promiseFn: FetchRss })
  dataLib = data
  return data
}

export const aPainting = [
  {
    name: String(''),
    year: String(''),
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

export function GetFullRss() {
  let data
  data = GetRss()
  if (typeof data != 'undefined') {
    const data_json3 = data.items.map(item => {
      return {
        name: String(''),
        year: String(item.category),
        description: String(item.description),
        source: String(item.link),
        artist: {
          image: String(''),
          name: String(''),
        },
        images: {
          thumbnail: String(item.enclosures[0].url),
          hero: {
            small: String(item.enclosures[0].url).replace('S.jpg', 'M.jpg'),
            large: String(item.enclosures[0].url).replace('S.jpg', 'L.jpg'),
          },
          gallery: String(''),
        },
      }
    })
    return data_json3.map((painting, index) => {
      return <GalleryCard {...painting} id={index} key={index} />
    })
  } else {
    console.log('data NO tiene datos')
    return aPainting.map((painting, index) => {
      return <GalleryCard {...painting} id={index} key={index} />
    })
  }
}

export function GetFullRssPaiting() {
  let data
  console.log(dataLib)
  //if (dataLib === undefined) dataLib = GetRss()
  data = dataLib
  if (data) {
    const data_json3 = data.items.map(item => {
      return {
        name: String(' '),
        year: String(item.category),
        description: HTMLparse(item.description, {
          replace: ({ attribs }) =>
            attribs && attribs.class != 'K2FeedIntroText' && <></>,
        }),
        source: String(item.link),
        artist: {
          image: String(''),
          name: String(' '),
        },
        images: {
          thumbnail: String(item.enclosures[0].url),
          hero: {
            small: String(item.enclosures[0].url).replace('S.jpg', 'M.jpg'),
            large: String(item.enclosures[0].url).replace('S.jpg', 'L.jpg'),
          },
          gallery: String(item.enclosures[0].url).replace('S.jpg', 'L.jpg'),
        },
      }
    })
    console.log(data)
    return data_json3
  } else {
    return aPainting
  }
}
/*class GetRemoteData {
  constructor() {
    this.aPainting = [
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
  }

  static getAPainting() {
    return this.aPainting
  }

  getFullRss() {
    const data = GetRss()

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
      return this.aPainting.map((painting, index) => {
        return <GalleryCard {...painting} id={index} key={index} />
      })
    }
  }

  static getFullRssJson() {
    const data = GetRss()

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
      return data_json3
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
      return aPainting
    }
  }

  GetARss() {
    const data = GetRss()
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
}
export default GetRemoteData*/
