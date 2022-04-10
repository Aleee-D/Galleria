import { useEffect } from 'react'
import { useAsync } from 'react-async'import { Painting } from 'models/painting'
import { parse } from 'rss-to-json'

const getRemoteData = () =>{
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

    const GetFullRss = () => {
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

    const GetARss = () => {
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
}

export default getRemoteData;