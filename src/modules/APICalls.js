import firebase from "firebase/app";
import { firebaseConfig } from "../components/fbAuth/FirebaseConfig";

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
	return fetch(`${dataURL}/movies.json/`)
		.then(response => response.json())

}
export const GetOneMovie = (fbid) => {
	return fetch(`${dataURL}/movies/${fbid}.json`)
		.then(response => response.json())
}

export const GetFriendMovie = (netflixid) => {
	return fetch(`${dataURL}/movies.json/?orderBy="netflixid"&equalTo="${netflixid}"`)
		.then(response => response.json())
}

export const GetFriendShow = (netflixid) => {
	return fetch(`${dataURL}/shows.json/?orderBy="netflixid"&equalTo="${netflixid}"`)
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

// export const getLikes = () => {
// 	return fetch(`${dataURL}/likes.json`)
// 		.then(response => response.json())

// }

export const addMovieLike = (likeObj) => {
	return fetch(`${dataURL}/movieLikes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(likeObj)
	}).then(response => response.json())
}

export const addShowLike = (likeObj) => {
	return fetch(`${dataURL}/showLikes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(likeObj)
	}).then(response => response.json())
}

export const getMovieLikes = (uid) => {
	return fetch(`${dataURL}/movieLikes.json/?orderBy="userId"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => { 
				return fetch(`${firebaseConfig.databaseURL}/movies.json/?orderBy="netflixid"&equalTo="${parsedResponse[item].showId}"`)
				.then(response => response.json())
				.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1]
				)
			})

				return urlArray; 
			})
		.then(requests => {
			let allPromises = (Promise.all(requests))
			.then(response => {
				response.map(item => {
					const newItem = Object.entries(item)
					return newItem
				})
				return response
			})
			return allPromises
		})
}

export const getShowLikes = (uid) => {
	
	return fetch(`${dataURL}/showLikes.json/?orderBy="userId"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => { 
				return fetch(`${firebaseConfig.databaseURL}/shows.json/?orderBy="netflixid"&equalTo="${parsedResponse[item].showId}"`)
				.then(response => response.json())
				.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1]
				)
			})

				return urlArray; 
			})
		.then(requests => {
			let allPromises = (Promise.all(requests))
			.then(response => {
				response.map(item => {
					const newItem = Object.entries(item)
					return newItem
				})
				return response
			})
			return allPromises
		})
}

export const getDislikes = (uid) => {
	return fetch(`${dataURL}/dislikes.json/?orderBy="userId"&equalTo="${uid}"`)
		.then(response => response.json())

}

export const getDislikesByUser = (uid) => {
	return fetch(`${dataURL}/movieDislikes.json/?orderBy="userId"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => { 
				return fetch(`${firebaseConfig.databaseURL}/movies.json/?orderBy="netflixid"&equalTo="${parsedResponse[item].showId}"`)
				.then(response => response.json())
				.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1]
				)
			})

				return urlArray; 
			})
		.then(requests => {
			let allPromises = (Promise.all(requests))
			.then(response => {
				response.map(item => {
					const newItem = Object.entries(item)
					return newItem
				})
				return response
			})
			return allPromises
		})
}

export const getShowDislikesByUser = (uid) => {
	return fetch(`${dataURL}/showDislikes.json/?orderBy="userId"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => { 
				return fetch(`${firebaseConfig.databaseURL}/shows.json/?orderBy="netflixid"&equalTo="${parsedResponse[item].showId}"`)
				.then(response => response.json())
				.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1]
				)
			})

				return urlArray; 
			})
		.then(requests => {
			let allPromises = (Promise.all(requests))
			.then(response => {
				response.map(item => {
					const newItem = Object.entries(item)
					return newItem
				})
				return response
			})
			return allPromises
		})
}

export const addMovieDislike = (dislikeObj) => {
	return fetch(`${dataURL}/movieDislikes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dislikeObj)
	}).then(response => response.json())
}

export const addShowDislike = (dislikeObj) => {
	return fetch(`${dataURL}/showDislikes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dislikeObj)
	}).then(response => response.json())
}

export const Unlike = (netflixid) => {
	return fetch(`${dataURL}/movieLikes.json/?orderBy="showId"&equalTo="${netflixid}"`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(response => {
		//should return 200 OK HTTP status code
		return response.status
	})
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

export const updateUser = (object) => {
	//we don't want to add the firebase key to the user object on firebase(duplication of data) so, 
	//make a reference to the fbid and then remove it from the object
	const uid = object.uid;
	delete object.uid;

	return fetch(`${dataURL}/users.json/?orderBy="uid"&equalTo="${uid}"`,{
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(object)
	})	
}

//////// Friends

export const getFriends = (uid) => {
	return fetch(`${dataURL}/friends.json/?orderBy="friendedById"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => {
				// const fetchDataURL = parsedResponse[item].pName;
				console.log(`${firebaseConfig.databaseURL}/users.json/?orderBy="uid"&equalTo="${parsedResponse[item].userId}"`)
				return fetch(`${firebaseConfig.databaseURL}/users.json/?orderBy="uid"&equalTo="${parsedResponse[item].userId}"`)
				.then(response => response.json())
				.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1])
			})
				return urlArray; 
			})
		.then(requests => {
			let allPromises = (Promise.all(requests))
			.then(response => {
				response.map(item => {
					const newItem = Object.entries(item)
					return newItem
				})
				return response
			})
			return allPromises
		})
}

export const getFriendsList = () => {
	return fetch(`${dataURL}/friends.json`)
		.then(response => response.json())
}

export const addFriend = (friendObj) => {
	return fetch(`${dataURL}/friends.json`, {
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

export const getUsersInGroup = () => {
	return fetch(`${dataURL}/groupUsers.json`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => {
				// const fetchDataURL = parsedResponse[item].pName;
				return fetch(`${firebaseConfig.databaseURL}/users.json/?orderBy="uid"&equalTo="${parsedResponse[item].userId}"`)
					.then(response => response.json())
					.then(parsedResponse => Object.values(Object.entries(parsedResponse))[0][1])
			})
			return urlArray;
		})
		.then(requests => {
			let allPromises = (Promise.all(requests))
				.then(response => {
					response.map(item => {
						const newItem = Object.entries(item)
						return newItem
					})
					return response
				})
			return allPromises
		})
}

export const getGroups = (uid) => {
		return fetch(`${dataURL}/groupUsers.json/?orderBy="friendedById"&equalTo="${uid}"`)
		.then(response => response.json())
		.then(parsedResponse => {
			const urlArray = Object.keys(parsedResponse).map(item => {
				// const fetchDataURL = parsedResponse[item].pName;
				return fetch(`${firebaseConfig.databaseURL}/groups.json/?orderBy="groupId"&equalTo="${parsedResponse[item].groupId}"`)
					.then(response => response.json())
					.then(parsedResponse =>  Object.values(Object.entries(parsedResponse))[0][1])
				})
					return urlArray; 
				})
			.then(requests => {
				let allPromises = (Promise.all(requests))
				.then(response => {
					response.map(item => {
						const newItem = Object.entries(item)
						return newItem
					})
					return response
				})
				return allPromises
			})
	}

export const GetOneGroup = (groupId) => {
	return fetch(`${dataURL}/groups.json/?orderBy="groupId"&equalTo="${groupId}"`)
		.then(response => response.json())
}

export const addGroup = (groupObj) => {
	return fetch(`${dataURL}/groups.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(groupObj)
	}).then(response => response.json())
}

export const deleteGroup = (groupObj) => {
	return fetch(`${dataURL}/groups/${groupObj}.json`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(response => {
		//should return 200 OK HTTP status code
		return response.status
	})
}

export const addGroupUser = (groupUserObj) => {
	return fetch(`${dataURL}/groupUsers.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(groupUserObj)
	}).then(response => response.json())
}

export const deleteGroupUser = (groupUserObj) => {
	return fetch(`${dataURL}/groupUsers/${groupUserObj}.json`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(response => {
		//should return 200 OK HTTP status code
		return response.status
	})
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