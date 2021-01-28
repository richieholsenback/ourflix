import React from "react";
import { Route } from "react-router-dom"
import { AllList } from "./Media/card/CardList"
import { MediaProvider } from "./Media/card/CardMediaProvider";
import { MovieList } from "./Media/movies/MovieList";
import { MovieProvider } from "./Media/movies/MovieProvider";
import { ShowList } from "./Media/shows/ShowList";
import { ShowProvider } from "./Media/shows/ShowProvider";
import { UserList } from "./users/UserList";
import { UserProvider } from "./users/UserProvider";

export const ApplicationView = () => {
    return (
        <>
            <MediaProvider>
                <Route exact path='/'>
                    <AllList />
                </Route>
            </MediaProvider>

            <MovieProvider>
                <Route exact path='/movies'>
                    <MovieList />
                </Route>
            </MovieProvider>

            <ShowProvider>
                <Route exact path='/shows'>
                    <ShowList />
                </Route>
            </ShowProvider>

            <UserProvider>
                <Route exact path='/users'>
                    <UserList />
                </Route>
            </UserProvider>
        </>
    )
}