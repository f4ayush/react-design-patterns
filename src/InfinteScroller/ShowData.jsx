import React, { useEffect, useState } from 'react'
import InfiniteScroller from './InfiniteScroller'

const style = {
    border: "1px solid black",
    padding: "10px 25px",
    margin: "15px"
}
function ShowData() {
    const [data, setdata] = useState([])
    const getData = async (pageNo) => {
        try {
            const result = await fetch("https://jsonplaceholder.typicode.com/photos?" + new URLSearchParams({
                _page: pageNo
            }))
            console.log(result)
            let photos = await result.json()
            photos = photos.map(photo=>photo.title)
            setdata([...data, ...photos])
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetData = async (pageNo) =>{
        await getData(pageNo)
    }
    const renderItem = (title, key, ref)=> <div style={style} ref={ref} key={key}>{title}</div>

    return (
        <InfiniteScroller dataList={data} renderItem={renderItem} handleGetData={handleGetData} />
    )
}

export default ShowData