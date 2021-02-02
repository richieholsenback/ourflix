import React from "react";
import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { FirebaseContext } from "./fbAuth/FirebaseProvider";
import { FriendDetails } from "./friends/FriendDetails";
import { FriendList } from "./friends/FriendList";
import { GroupDetails } from "./groups/GroupDetails";
import { GroupUserList } from "./groups/GroupList";
import { MediaDetails } from "./Media/card/CardDetails";
import { AllList } from "./Media/card/CardList"
import { MovieList } from "./Media/movies/MovieList";
import { ShowList } from "./Media/shows/ShowList";
import { UserDetails } from "./users/UserDetails";
import { UserList } from "./users/UserList";
import { UserSearch } from "./users/UserSearch";
import { LogIn } from "./login/LogIn";
import { Register } from "./login/Register";
import { MovieProvider } from "./Media/movies/MovieProvider";
import { ShowProvider } from "./Media/shows/ShowProvider";

export const ApplicationView = () => {
    const { isLoggedIn } = useContext(FirebaseContext);

    return (
        <Switch>
            
            <Route path="/login">
                <LogIn />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

                <Route path="/" exact>
                    {isLoggedIn ? <AllList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/movies">
                    {isLoggedIn ? <MovieList /> : <Redirect to="/login" />}
                </Route>

            <ShowProvider>
                <Route path="/shows">
                    {isLoggedIn ? <ShowList /> : <Redirect to="/login" />}
                </Route>
            </ShowProvider>

            <Route path="/details">
                {isLoggedIn ? <MediaDetails /> : <Redirect to="/login" />}
            </Route>

            <Route path="/users">
                {isLoggedIn ? <><UserSearch /> <UserList /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends">
                {isLoggedIn ? <><FriendList /> <GroupUserList /></> : <Redirect to="/login" />}
            </Route>


            <Route path="/users/detail/:userId(\d+)">
                {isLoggedIn ? <UserDetails /> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends/detail/:friendId(\d+)">
                {isLoggedIn ? <FriendDetails /> : <Redirect to="/login" />}
            </Route>

            <Route path="/groups/detail/:groupId(\d+)">
                {isLoggedIn ? <GroupDetails /> : <Redirect to="/login" />}
            </Route>
        </Switch>
    )
}