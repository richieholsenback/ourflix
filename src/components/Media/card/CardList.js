import React, { useContext, useEffect } from "react"
import { MediaContext } from "./CardMediaProvider"
import { MediaCard } from "./Card"

export const AllList = () => {

    const { results, getResults } = useContext(MediaContext)

    useEffect(() => {
        getResults()
    }, [])

    return (
        <div>
            {
                results.map(result => {
                    return <MediaCard key={result.id} result={result} />
                })
            }
        </div>
    )
}

