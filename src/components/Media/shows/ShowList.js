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
                shows.map(item => {
                    return <MediaCard key={item.nfid} item={item} />
                })
            }
        </div>
    )
}

