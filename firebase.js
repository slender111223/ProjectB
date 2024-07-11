import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {deleteField ,increment , collection, doc, setDoc, Timestamp,updateDoc, serverTimestamp, getDoc ,deleteDoc , onSnapshot, addDoc, query, where, getDocs,orderBy, limit  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyD4xNEEd5NPgLkcD_2Dmvb4trd63KiRfKQ",
    authDomain: "projectb-ac6d1.firebaseapp.com",
    databaseURL: "https://projectb-ac6d1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectb-ac6d1",
    storageBucket: "projectb-ac6d1.appspot.com",
    messagingSenderId: "960410248841",
    appId: "1:960410248841:web:b8ffb7825eaca5d6e08858",
    measurementId: "G-WB1DR9LTHN"
  };

const app = initializeApp(firebaseConfig);
// To initialize database you need to pass app as a parameter of getFirestore

const db = getFirestore(app);


///////////////////////////////////////////////////////////////////////////////////////// MAIN


//lấy ra số lần hiện tại từ doc 1
let docsList = await getData("BGX")
let soLanHienTai = docsList["BGXWeb"]["soLan"]

//Gán số lần lên web
ganThongTin(soLanHienTai)




























////////////////////////////////////////////////////////// HÀM THỰC THI

function ganThongTin(soLan){
    document.getElementById("soLanDisplay").textContent = soLan
    document.getElementById("username").value = "thisisforbgx"+soLan
}
































////////////////////////////////////////////////////////////// HÀM CỐ ĐỊNH



//Hàm lấy document từ collection
async function getData(nameCollection){
    try{
    let q = await query(collection(db,nameCollection));
    let qSnap = await getDocs(q);
    let data = {}
    qSnap.forEach((doc)=>{   
        data[doc.id] = doc.data() ;
       }
      )
      return data
    } catch(e){
    	console.log(e);
    }
}
