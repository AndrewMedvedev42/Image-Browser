import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';

export const MainPage = () => {
    const [imageList, setImageList] = useState([])
    const [inputValue, setInputValue] = useState("")
    useEffect(()=>{
        if (!isNaN(inputValue)) {
            axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&per_page=30&page=1`)
            .then((res)=>{setImageList(res.data);})
        } else {
            axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&query=${inputValue}}&per_page=30`)
                .then((res)=>{setImageList(res.data.results);})
        }
    },[inputValue])
    return (
        <section className="main-page-section">
            <section className="input-form">
                <input className="input-field" placeholder="Search" onChange={(e)=>{setInputValue(e.target.value)}}/>
            </section>
            <section className="gallery-layout">
                {imageList.length ? (
                    imageList.map(item=>{
                        return (
                                <Link to={`/image/${item.id}`}>
                                    <img key={item.id} src={item.urls.small}/>
                                </Link>
                        )
                    })
                ):(<h2>No images found</h2>)}
            </section>
        </section>
    )
}