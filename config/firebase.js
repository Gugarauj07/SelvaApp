import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const colRef = collection(db, "UserInfo")

export async function adicionarDocumento(fullName, citys, userID) {
  try {
    const docRef = await addDoc(colRef, {
      citys: citys,
      fullName: fullName,
      userID: userID
  });
  console.log("Document written with ID: ", docRef.id);
  } catch (e) {
  console.error("Erro ao adicionar documento:", e);
  }
}

export async function getDocumento(userID) {
  const q = query(colRef, where("userID", "==", userID));

  const querySnapshot = await getDocs(q);
  if (querySnapshot) {
    const docSnap = querySnapshot.docs[0];
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
export async function updateDocumento(userID, citys, notification) {
  const q = query(colRef, where("userID", "==", userID));

  await updateDoc(q, {
    citys: citys
    // "notification": notification
  });

  console.log("updated")

}