import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Pagination from '../componets/pagination'
import axios from 'axios';

export const MainPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [fetchedData, setFetchedData] = useState([]);
    const [inputValue, setInputValue] = useState("")

    useEffect(()=>{
        if (!isNaN(inputValue)) {
            axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&per_page=30&page=${pageNumber}`)
            .then((res)=>{
                console.log(res.data);
                setFetchedData(res.data)
            })
        } else {
            axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}&query=${inputValue}}&per_page=30`)
                .then((res)=>{
                    console.log(res.data);
                    setFetchedData(res.data.results)
                })
        }
    },[inputValue, pageNumber])
    return (
        <section className="main-page-section">
            <section className="input-form">
                <input className="input-field" placeholder="Search" onChange={(e)=>{setInputValue(e.target.value)}}/>
            </section>
            <section className="gallery-layout">
                {fetchedData.length ? (
                    fetchedData.map(item=>{
                        return (
                                <Link to={`/images/${item.id}`}>
                                    <img key={item.id} src={item.urls.small}/>
                                </Link>
                        )
                    })
                ):(<h2>No images found</h2>)}
            </section>
            <Pagination 
                pageNumber={pageNumber} 
                setPageNumber={setPageNumber} 
            />
        </section>
    )
}