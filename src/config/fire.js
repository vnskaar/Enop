import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCqhdaglghFChvS3WII2PzKNxibL92yx54",
    authDomain: "enop-f7773.firebaseapp.com",
    projectId: "enop-f7773",
    storageBucket: "enop-f7773.appspot.com",
    messagingSenderId: "636966944556",
    appId: "1:636966944556:web:00549bb4d0682a27bfb689",
    measurementId: "G-8L76FSM4ZM"
})

export const auth = app.auth()
export default app