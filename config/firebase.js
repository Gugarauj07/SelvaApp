import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgAyeN77dEVMIboq5j6wEF9Dl1f82npCI",
    authDomain: "selvaapp-7f4dd.firebaseapp.com",
    databaseURL: "https://selvaapp-7f4dd-default-rtdb.firebaseio.com",
    projectId: "selvaapp-7f4dd",
    storageBucket: "selvaapp-7f4dd.appspot.com",
    messagingSenderId: "803360995227",
    appId: "1:803360995227:web:9548755c64027a1920933e",
    measurementId: "G-G59TE1FCPN"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt';
