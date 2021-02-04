import React from "react";
import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { FirebaseContext } from "./fbAuth/FirebaseProvider";
import { FriendDetails } from "./friends/FriendDetails";
import { FriendList } from "./friends/FriendList";
import { GroupDetails } from "./groups/GroupDetails";
import { MediaDetails } from "./Media/card/CardDetails";
import { UserDetails } from "./users/UserDetails";
import { UserList } from "./users/UserList";
// import { UserSearch } from "./users/UserSearch";
import { LogIn } from "./login/LogIn";
import { Register } from "./login/Register";
import { MovieList } from "./Media/movies/MovieList";
import { ShowList } from "./Media/shows/ShowList";
import Advanced from "./test";

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

            <Route exact path="/">
                {isLoggedIn ? <MovieList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/movies">
                {isLoggedIn ? <MovieList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/shows">
                {isLoggedIn ? <ShowList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/movies/details/:nfid(\d+)">
                {isLoggedIn ? <MediaDetails /> : <Redirect to="/login" />}
            </Route>

            <Route path="/users">
                {isLoggedIn ? <><UserList /></> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/advanced">
                {isLoggedIn ? <><Advanced /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends">
                {isLoggedIn ?
                    <>
                        <FriendList />
                        {/* <GroupUserList /> */}
                    </> : <Redirect to="/login" />}
            </Route>


            <Route path="/users/detail/:useruid(\d+)">
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