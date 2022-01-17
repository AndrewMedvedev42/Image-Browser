import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';

export const ImagePage = () => {
    const [image, setImage] = useState()
    const [relatedImageList, setRelatedImageList] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    useEffect(()=>{
        axios.get(`https://api.unsplash.com/photos/${pathID}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}`)
            .then((res)=>{setImage(res.data);})
    },[pathID])

    const getAllTags = (object) => {
        console.log(object.tags);
        const queryArray = []
        object.tags.forEach((item)=>{
            queryArray.push(`query=${item.title}`)
        })
        return queryArray.join("&")
    }

    useEffect(()=>{
        if (image) {
            if (image.tags) {
                axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&${getAllTags(image)}`)
                .then((res)=>{setRelatedImageList(res.data.results);})
            }
        }
    },[image])
    console.log(image);
    console.log(relatedImageList);
    return (
        <section className="image-page">
            <section className="image-preview-section">
                {image && (
                    <>
                        <img src={image.urls.small} alt={image.alt_description}/>
                        <article>
                            <h1>{image.description}</h1>
                            <div>
                                <img src="Author photo"/>
                                <p>{image.user.first_name} {image.user.last_name}</p>
                            </div>
                        </article>
                    </>
                )}
            </section>
            <section>
                <h2>Related images</h2>
                <ul>
                    {
                        relatedImageList && (
                            relatedImageList.map((item)=>{
                                return (
                                    <li>
                                        <Link to={`/image/${item.id}`}>
                                            <img src={item.urls.small}/>
                                        </Link>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </section>
        </section>
    )
}