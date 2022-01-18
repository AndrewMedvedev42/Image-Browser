import { AiFillLike, AiFillHome } from "react-icons/ai";
import { useEffect, useState } from "react"
import { BackButtonsMenu } from "../componets/back-buttons-menu";
import { Link,  useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const ImagePage = () => {
    const history = useNavigate()
    const [image, setImage] = useState()
    const [relatedImageList, setRelatedImageList] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    useEffect(()=>{
        axios.get(`https://api.unsplash.com/photos/${pathID}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}`)
            .then((res)=>{setImage(res.data);})
    },[pathID])

    const getAllTags = (object) => {
        const queryArray = []
        object.tags.forEach((item)=>{
            queryArray.push(`query=${item.title}`)
        })
        return queryArray.join("&")
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(()=>{
        if (image) {
            if (image.tags) {
                axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&${getAllTags(image)}&per_page=30`)
                .then((res)=>{setRelatedImageList(res.data.results);})
            }
        }
    },[image])
    return (
        <section className="image-page">
            <BackButtonsMenu/>
            <section className="image-preview-section">
                {image ? (
                    <>
                        <img src={image.urls.small} alt={image.alt_description}/>
                        <article className="photo-details">
                            <article className="author-details">
                                <Link to={`/user/${image.user.username}`}>
                                    <p className="author-profile-name"><span>Photo by:</span> {image.user.first_name} {image.user.last_name}</p>
                                    <img className="author-profile-photo" src={image.user.profile_image.large}/>
                                </Link>
                            </article>
                            <article className="review-section">
                                <AiFillLike size={32}/>
                                <p className="like-count">{image.likes}</p>
                            </article>
                        </article>
                    </>
                ):(
                    <>
                        <img className="empty-image" src="#"/>
                        <article className="photo-details">

                        </article>
                    </>
                )}
            </section>
            <section className="related-images-section">
                <h2 className="reated-images-message">Related images</h2>
                <section className="gallery-layout">
                    {
                        relatedImageList && (
                            relatedImageList.map((item)=>{
                                return (
                                        <Link onClick={()=>{scrollToTop()}} to={`/image/${item.id}`}>
                                            <img src={item.urls.small}/>
                                        </Link>
                                )
                            })
                        )
                    }
                </section>
            </section>
        </section>
    )
}