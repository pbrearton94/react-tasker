import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBAbZg34o38PMkyAG6qySw1Uq35BbgDW_o",  
    authDomain: "tasker-e23ad.firebaseapp.com",
    projectId: "tasker-e23ad",  
    storageBucket: "tasker-e23ad.appspot.com",
    messagingSenderId: "1045483858911",
    appId: "1:1045483858911:web:bc5509c75b62503e22f26a"
  };
  
  const testApp = initializeApp(firebaseConfig);

  export default testApp;