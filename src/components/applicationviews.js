import React from "react";
import { Route } from "react-router-dom"
import { CardList } from "./card/CardList"
import { MediaProvider } from "./card/CardMediaProvider";

export const ApplicationView = () => {
    return (
        <>
            <MediaProvider>
                <Route exact path='/'>
                    <CardList />
                </Route>
            </MediaProvider>
        </>
    )
}