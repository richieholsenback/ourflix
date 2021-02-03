import firebase from "firebase/app";
import  { firebaseConfig }  from "../components/fbAuth/FirebaseConfig";

console.log("fb",firebase);
const dataURL = firebaseConfig.databaseURL;

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

export const getShows = () => {
	return fetch(`${dataURL}/shows.json`)
	.then(response => response.json())
	
}

export const getFriends = () => {
	return fetch(`${dataURL}/friends.json/?orderBy="UID"&equalTo="${firebase.auth().currentUser.uid}"`)
	.then(response => response.json())
	
}

export const getGroups = () => {
	return fetch(`${dataURL}/groups.json`)
	.then(response => response.json())
	
}

export const getLikes = () => {
	return fetch(`${dataURL}/likes.json`)
	.then(response => response.json())
	
}

export const getDislikes = () => {
	return fetch(`${dataURL}/dislikes.json`)
	.then(response => response.json())
	
}

export const getGroupUsers = () => {
	return fetch(`${dataURL}/groupUsers.json`)
	.then(response => response.json())
	
}


export const getOneMovie = (fbid) => {
	console.log("getone", fbid);
	return fetch(`${dataURL}/movies/${fbid}.json`)
	.then(response => response.json())
}

//////// Friends

export const addFriend = (friendObj) => {
	return fetch(`${dataURL}/ourflix.json`,{
		method:"POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(friendObj)
	}).then(response => response.json())
}

export const updateItem = (itemObj) => {
	//we don't want to add the firebase key to the item object on firebase(duplication of data) so, 
	//make a reference to the fbid and then remove it from the object
	const fbid = itemObj.fbid;
	delete itemObj.fbid;

	return fetch(`${dataURL}/christList/${fbid}.json`,{
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

	return fetch(`${dataURL}/christList/${fbid}.json`,{
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(itemObj)
	})	
}

export const deleteItem = (itemFBID) => {
	return fetch(`${dataURL}/christList/${itemFBID}.json`,{
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(response => {
		//should return 200 OK HTTP status code
		return response.status
	})
}