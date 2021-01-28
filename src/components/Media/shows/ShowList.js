import React, { useContext, useEffect } from "react"
import { MediaCard } from "../card/Card"
import { ShowContext } from "./ShowProvider"

export const ShowList = () => {

    const { shows, getShows } = useContext(ShowContext)

    useEffect(() => {
        getShows()
    }, [])

    return (
        <div>
            {
                shows.map(result => {
                    return <MediaCard key={result.id} result={result} />
                })
            }
        </div>
    )
}

