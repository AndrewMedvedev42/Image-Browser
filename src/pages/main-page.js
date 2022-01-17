import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';

export const MainPage = () => {
    const [imageList, setImageList] = useState([])
    useEffect(()=>{
        axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&per_page=30&page=1&page=2`)
            .then((res)=>{setImageList(res.data);})
    },[])
    console.log(imageList);
    return (
        <section className="main-page-section">
            <section className="image-list">
                {imageList.length && (
                    imageList.map(item=>{
                        return (
                                <Link to={`/image/${item.id}`}>
                                    <img key={item.id} src={item.urls.small}/>
                                </Link>
                        )
                    })
                )}
            </section>
        </section>
    )
}