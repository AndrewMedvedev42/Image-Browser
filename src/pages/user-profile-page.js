import { useEffect, useState } from "react"
import { Link, useLocation} from "react-router-dom";
import { BackButtonsMenu } from "../componets/back-buttons-menu";
import axios from 'axios';

export const UserProfilePage = () => {
    const [userInfo, setUserInfo] = useState()
    const [userCollection, setUserCollection] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    
    useEffect(()=>{
            axios.get(`https://api.unsplash.com/users/${pathID}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}`)
                .then((res)=>{setUserInfo(res.data);})
    },[])

    useEffect(()=>{
        axios.get(`https://api.unsplash.com/users/${pathID}/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&per_page=30`)
            .then((res)=>{setUserCollection(res.data);})
    },[userInfo])
    return (
        <section className="user-page-section">
            <BackButtonsMenu/>
            {
                userInfo && (
                    <>
                        <article className="user-details">
                            <img src={userInfo.profile_image.large}/>
                            <h1 className="user-first-last-name">{userInfo.first_name} {userInfo.last_name}</h1>
                            <h2 className="user-username">{userInfo.username}</h2>
                            <p className="user-bio">{userInfo.bio}</p>
                        </article>
                        <article className="account-details">
                            <h4>Photos: {userInfo.total_photos}</h4>
                        </article>
                        <section className="gallery-layout">
                            {
                                userCollection && (
                                    userCollection.map(item=>{
                                        return (
                                            <Link to={`/image/${item.id}`}>
                                                <img src={item.urls.regular}/>
                                            </Link>                     
                                        )
                                    })
                                )
                            }
                        </section>
                    </>
                )
            }
        </section>
    )
}