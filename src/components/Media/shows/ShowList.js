import React, { useContext, useEffect, useState } from "react"
import { MediaCard } from "../card/Card"
import { getShows } from "../../../modules/APICalls"

export const ShowList = () => {

    const [showArray, setShowArray] = useState([])

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllShows = () => {
        getShows()
            .then(data => {
                console.log("fb data", data)
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })

                console.log("arrayWithFBID", arrayWithFBID);
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setShowArray(arrayWithFBID)
            })
    }

    useEffect(() => {
		getAllShows()
	}, [])

    return (
        <div>
            {
                showArray.map(item => {
                    return <MediaCard key={item.nfid} item={item} />
                })
            }
        </div>
    )
}

