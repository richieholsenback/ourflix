import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GroupUserCard } from "./GroupCard"
import { GroupUserContext } from "./GroupUsersProvider"

export const GroupUserList = () => {

    const { groupUsers, getGroupUsers } = useContext(GroupUserContext)

    useEffect(() => {
        getGroupUsers()
    }, [])

    //   const history = useHistory()
    //   //returns the user's list of groupUsers

    //   const filteredGroupUsers = groupUsers.filter(groupUser => groupUser.followedById === parseInt(sessionStorage.getItem("active_user")))

    return (
        <section className="groupUsers">
            <h2>Your Groups</h2>
            <div className="followingList">
                {
                    groupUsers.map(groupUser => {
                        return <GroupUserCard key={groupUser.id} groupUser={groupUser} user={groupUser.user} group={groupUser.group}/>
                    })
                }
            </div>
        </section>
    )
}