import React, { useEffect, useRef, useState } from 'react'

function InfiniteScroller({ dataList, renderItem, handleGetData }) {
    const pageNo= useRef(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        handleGetData(pageNo.current).finally(() => setLoading(false))
    }, [])
    const observer = useRef(null)
    const lastElementObserver = (node) => {
        console.log("lolo")
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                pageNo.current += 1;
                
                setLoading(true)
                handleGetData(pageNo.current).finally(() => setLoading(false))
            }
        })
        if(node) observer.current.observe(node)
    };
    const renderList = () => {
        return dataList.map((data, index) => {
            if(dataList.length - 1 === index) return renderItem(data, index, lastElementObserver)
            return renderItem(data, index, null)
        })
    }
    return (
        <div>
            {
                renderList()
            }
            {
                loading && "Loading...."
            }
        </div>
    )
}

export default InfiniteScroller