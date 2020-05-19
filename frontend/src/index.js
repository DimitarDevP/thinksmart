import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import * as firebase from 'firebase'


var config = {
    apiKey: "AIzaSyD-JbZNACfXfqlsvNIQJbGEwIp_kY-6iC8",
    authDomain: "thinksmart-54f50.firebaseapp.com",
    databaseURL: "https://thinksmart-54f50.firebaseio.com",
    projectId: "thinksmart-54f50",
    storageBucket: "thinksmart-54f50.appspot.com",
    messagingSenderId: "45126276138"
};
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))