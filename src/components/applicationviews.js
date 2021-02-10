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
import { UserForm } from "./users/UserForm";
import { GroupForm } from "./groups/GroupAddUser";
import { GroupList } from "./groups/GroupList"
import { UserSearch } from "./users/UserSearch";
import { UserActiveDetails } from "./users/UserActiveDetails"
import { LikedMediaDetails } from "./Media/card/UserCardDetail";

export const ApplicationView = () => {
    const { isLoggedIn } = useContext(FirebaseContext);

    return (
        <Switch>
            <Route path="/login">
                {isLoggedIn ? <Redirect to="/" /> : <LogIn />}
            </Route>

            <Route path="/register">
            {isLoggedIn ? <Redirect to="/" /> : <Register />}
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

            <Route path="/movie/details/:fbid">
                {isLoggedIn ? <> <NavBar /><MovieDetails /> </>: <Redirect to="/login" />}
            </Route>
            
            <Route path="/show/details/:fbid">
                {isLoggedIn ? <> <NavBar /><ShowDetails /> </>: <Redirect to="/login" />}
            </Route>

            <Route exact path="/users">
                {isLoggedIn ? <> <NavBar /></> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/advanced">
                {isLoggedIn ? <> <NavBar /><Advanced /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friends">
                {isLoggedIn ? <> <NavBar />  <FriendList /> <UserList /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/groups">
                {isLoggedIn ? <> <NavBar />  <GroupList /> </> : <Redirect to="/login" />}
            </Route>


            <Route path="/user/details/:uid">
                {isLoggedIn ? <> <NavBar /><UserDetails /></> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/myprofile/:uid">
                {isLoggedIn ? <> <NavBar /><UserActiveDetails /></> : <Redirect to="/login" />}
            </Route>

            <Route path="/friend/details/:uid">
                {isLoggedIn ? <> <NavBar /><FriendDetails /></> : <Redirect to="/login" />}
            </Route>
            
            <Route path="/media/details/:netflixid">
                {isLoggedIn ? <> <NavBar /><LikedMediaDetails /></> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/group/details/:groupId">
                {isLoggedIn ? <> <NavBar /><GroupDetails /> </>: <Redirect to="/login" />}
            </Route>
            
            <Route exact path="/group/details/:groupId/add">
                {isLoggedIn ? <> <NavBar /><GroupForm /> </>: <Redirect to="/login" />}
            </Route>
            
            <Route path="/user/update/:fbid">
                {isLoggedIn ? <> <NavBar /><UserForm /> </>: <Redirect to="/login" />}
            </Route>
        </Switch>

    )
}