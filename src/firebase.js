import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAogldapNSmqSBK_mgCTBBXkqoJmLPXiFE",
    authDomain: "whatsapp-clone-acdd3.firebaseapp.com",
    projectId: "whatsapp-clone-acdd3",
    storageBucket: "whatsapp-clone-acdd3.appspot.com",
    messagingSenderId: "756819394979",
    appId: "1:756819394979:web:7b31736070c4e00af75a16",
    measurementId: "G-46QM7BK05Z"
  };


let app=firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth= firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;