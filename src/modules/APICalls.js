import firebase from "firebase/app";
import { firebaseConfig } from "../components/fbAuth/FirebaseConfig";
import { MediaCard } from "../components/Media/card/Card";
import { UserList } from "../components/users/UserList";

const dataURL = firebaseConfig.databaseURL;

////// Media

//https://firebase.google.com/docs/reference/rest/database

export const getMovies = () => {
	//in the rules section of your Firebase Database, be sure to include 'indexOn` for the properties you will need for selection
	// for example: only return items with a specific uid
	/* 
		"christList": {
			".indexOn": ["uid"]
		}
	*/

	// https://firebase.google.com/docs/database/rest/retrieve-data?authuser=0
	// combine orderBy with any of the other five parameters: limitToFirst, limitToLast, startAt, endAt, and equalTo
	return fetch(`${dataURL}/movies.json`)
		.then(response => response.json())

}
export const GetOneMovie = (fbid) => {
	return fetch(`${dataURL}/movies/${fbid}.json`)
		.then(response => response.json())
}

export const getShows = () => {
	return fetch(`${dataURL}/shows.json/?orderBy="rating"`)
		.then(response => response.json())
}

export const GetOneShow = (fbid) => {
	return fetch(`${dataURL}/shows/${fbid}.json`)
		.then(response => response.json())
}


///////// Likes & Dislikes

export const getLikes = () => {
	return fetch(`${dataURL}/likes.json`)
		.then(response => response.json())

}

export const addLike = (likeObj) => {
	return fetch(`${dataURL}/likes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(likeObj)
	}).then(response => response.json())
}

export const getDislikes = () => {
	return fetch(`${dataURL}/dislikes.json`)
		.then(response => response.json())

}

export const addDislike = (dislikeObj) => {
	return fetch(`${dataURL}/dislikes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dislikeObj)
	}).then(response => response.json())
}

//////// Users

export const getUsers = () => {
	return fetch(`${dataURL}/users.json`)
		.then(response => response.json())

}

export const GetOneUser = (fbid) => {
	return fetch(`${dataURL}/users/${fbid}.json`)
		.then(response => response.json())
}

export const getUserConfirm = () => {
	return fetch(`${dataURL}/users.json/?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
		.then(response => response.json())
}

export const getOneUserAlt = (uid) => {
	return fetch(`${dataURL}/users.json/?orderBy="uid"&equalTo="${uid}"`)
		.then(response => response.json())
}

export const addUser = (userObj) => {
	return fetch(`${dataURL}/users.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	}).then(response => response.json())
}

export const updateUser = (userObj) => {
	//we don't want to add the firebase key to the user object on firebase(duplication of data) so, 
	//make a reference to the fbid and then remove it from the object
	const fbid = userObj.fbid;
	delete userObj.fbid;

	return fetch(`${dataURL}/users/${fbid}.json`,{
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})	
}

//////// Friends

export const getFriends = () => {
	return fetch(`${dataURL}/friends.json/?orderBy="friendedId"&equalTo="xVcCfTO4f1Mvu9eLYMhuFyyu54A3"`)
		.then(response => response.json())
		.then(parsedResponse => {
			console.log("first call", parsedResponse)
			const urlArray = Object.keys(parsedResponse)
			const responseArray = urlArray.map(item => {
				console.log(parsedResponse[item].uid)
				return fetch(`${firebaseConfig.databaseURL}/users.json/?orderBy="uid"&equalTo="${parsedResponse[item].uid}"`)
				.then(response => {
					response.json()
				})
			})
			return responseArray;
		})
		.then(requests => {
			Promise.all(requests)
			.then(responses => {
				console.log("responses", responses)
			})
		})
}

export const addFriend = (friendObj) => {
	return fetch(`${dataURL}/ourflix.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(friendObj)
	}).then(response => response.json())
}

//////// Groups

export const getGroupUsers = () => {
	return fetch(`${dataURL}/groupUsers.json`)
		.then(response => response.json())

}

export const getGroups = () => {
	return fetch(`${dataURL}/groups.json`)
		.then(response => response.json())

}

export const addGroup = (groupObj) => {
	return fetch(`${dataURL}/ourflix.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(groupObj)
	}).then(response => response.json())
}





export const updateItem = (itemObj) => {
	//we don't want to add the firebase key to the item object on firebase(duplication of data) so, 
	//make a reference to the fbid and then remove it from the object
	const fbid = itemObj.fbid;
	delete itemObj.fbid;

	return fetch(`${dataURL}/christList/${fbid}.json`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(itemObj)
	})
}

export const updateChristList = (itemObj) => {

	//we don't want to add the firebase key to the item object on firebase(duplication of data) so, 
	//make a reference to the fbid and then remove it from the object
	const fbid = itemObj.fbid;
	delete itemObj.fbid;

	return fetch(`${dataURL}/christList/${fbid}.json`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(itemObj)
	})
}

export const deleteItem = (itemFBID) => {
	return fetch(`${dataURL}/christList/${itemFBID}.json`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(response => {
		//should return 200 OK HTTP status code
		return response.status
	})
}