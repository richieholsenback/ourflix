import React, { useContext, useEffect } from "react"
import { MediaCard } from "../card/Card"
import { MovieContext } from "./MovieProvider"

export const MovieList = () => {

    const { movies, getMovies } = useContext(MovieContext)

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div>
            {
                movies.map(result => {
                    return <MediaCard key={result.id} result={result} />
                })
            }
        </div>
    )
}

