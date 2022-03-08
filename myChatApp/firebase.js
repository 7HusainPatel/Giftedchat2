import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAikDEIRfGAlnt3Oqq_EBDLBpZ34GvJoIY",
    authDomain: "gifted-chat-78287.firebaseapp.com",
    projectId: "gifted-chat-78287",
    storageBucket: "gifted-chat-78287.appspot.com",
    messagingSenderId: "847569144703",
    appId: "1:847569144703:web:dc0b7b93b4605a6b96a84a"
  };

  let app;
  if (firebase.apps.length === 0) {
      
      app = firebase.initializeApp(firebaseConfig);
  }
  else{
      app = firebase.app()// its already exist
  }

  const db = app.firestore(); //export the database
  const auth = firebase.auth();
  export {db,auth};