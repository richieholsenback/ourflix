import React from "react";
import { Route } from "react-router-dom"
import { FriendDetails } from "./friends/FriendDetails";
import { FriendList } from "./friends/FriendList";
import { FriendProvider } from "./friends/FriendProvider";
import { GroupDetails } from "./groups/GroupDetails";
import { GroupUserList } from "./groups/GroupList";
import { GroupsProvider } from "./groups/GroupProvider";
import { GroupUsersProvider } from "./groups/GroupUsersProvider";
import { MediaDetails } from "./Media/card/CardDetails";
import { AllList } from "./Media/card/CardList"
import { MediaProvider } from "./Media/card/CardMediaProvider";
import { MovieList } from "./Media/movies/MovieList";
import { MovieProvider } from "./Media/movies/MovieProvider";
import { ShowList } from "./Media/shows/ShowList";
import { ShowProvider } from "./Media/shows/ShowProvider";
import { UserDetails } from "./users/UserDetails";
import { UserList } from "./users/UserList";
import { UserProvider } from "./users/UserProvider";
import { UserSearch } from "./users/UserSearch";

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

            <ShowProvider>
                <Route exact path='/details'>
                    <MediaDetails />
                </Route>
            </ShowProvider>

            <UserProvider>
                <Route exact path='/users'>
                    <UserSearch />
                    <UserList />
                </Route>
            </UserProvider>

            <FriendProvider>
                <UserProvider>
                    <Route exact path="/friends">
                        <FriendList />
                    </Route>
                </UserProvider>
            </FriendProvider>

            <GroupUsersProvider>
                <UserProvider>
                    <GroupsProvider>
                        <Route exact path="/friends">
                            <GroupUserList />
                        </Route>
                    </GroupsProvider>
                </UserProvider>
            </GroupUsersProvider>

            <UserProvider>
                <Route exact path="/users/detail/:userId(\d+)">
                    <UserDetails />
                </Route>
            </UserProvider>

            <FriendProvider>
                <UserProvider>
                    <Route exact path="/friends/detail/:friendId(\d+)">
                        <FriendDetails />
                    </Route>
                </UserProvider>
            </FriendProvider>

            <GroupsProvider>
                <Route exact path="/groups/detail/:groupId(\d+)">
                    <GroupDetails />
                </Route>
            </GroupsProvider>
        </>
    )
}