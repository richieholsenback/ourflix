import React from "react";
import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { FirebaseContext } from "./fbAuth/FirebaseProvider";
import { FriendDetails } from "./friends/FriendDetails";
import { FriendList } from "./friends/FriendList";
import { GroupDetails } from "./groups/GroupDetails";
import { UserDetails } from "./users/UserDetails";
import { UserList } from "./users/UserList";
// import { UserSearch } from "./users/UserSearch";
import { LogIn } from "./login/LogIn";
import { Register } from "./login/Register";
import { MovieList } from "./Media/movies/MovieList";
import { ShowList } from "./Media/shows/ShowList";
import Advanced from "./test";
import { NavBar } from "./nav/Nav";
import { MovieDetails } from "./Media/movies/MovieDetails";
import { ShowDetails } from "./Media/shows/ShowDetails";

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
                {isLoggedIn ? <> <NavBar /> <MovieList /></> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/movies">
                {isLoggedIn ? <> <NavBar /><MovieList /></> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/shows">
                {isLoggedIn ? <> <NavBar /><ShowList /> </>: <Redirect to="/login" />}
            </Route>

            <Route path="/moviedetail/:fbid">
                {isLoggedIn ? <> <NavBar /><MovieDetails /> </>: <Redirect to="/login" />}
            </Route>
            
            <Route path="/showdetail/:fbid">
                {isLoggedIn ? <> <NavBar /><ShowDetails /> </>: <Redirect to="/login" />}
            </Route>

            <Route path="/users">
                {isLoggedIn ? <> <NavBar /><UserList /></> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/advanced">
                {isLoggedIn ? <> <NavBar /><Advanced /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends">
                {isLoggedIn ? <> <NavBar />  <FriendList /> </> : <Redirect to="/login" />}
            </Route>


            <Route path="/users/detail/:useruid(\d+)">
                {isLoggedIn ? <> <NavBar /><UserDetails /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends/detail/:friendId(\d+)">
                {isLoggedIn ? <> <NavBar /><FriendDetails /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/groups/detail/:groupId(\d+)">
                {isLoggedIn ? <> <NavBar /><GroupDetails /> </>: <Redirect to="/login" />}
            </Route>
        </Switch>

    )
}