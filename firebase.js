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
let thongtinDB = {
    nameCollection: "BGX",
    nameDoc: "BGXWeb"
}
let soLanHienTai = 0;

document.getElementById("tangSo").addEventListener("click", function(){ThayDoiSoLan("Tang");});
document.getElementById("giamSo").addEventListener("click", function(){ThayDoiSoLan("Giam");});

// Lấy ra số lần hiện tại từ document
getData(thongtinDB.nameCollection);

////////////////////////////////////////////////////////// HÀM THỰC THI

function ganThongTin(soLan) {
    document.getElementById("soLanDisplay").textContent = soLan;
    document.getElementById("username").value = "thisisforbgx" + soLan;
}

function showNotification(message) {
    const notification = document.getElementById('notificationCopy');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

async function ThayDoiSoLan(change) {
    let soUpdate = soLanHienTai;
    if (change==="Tang"){
        soUpdate++;
    }else{
        soUpdate--;
    }
    let ketQuaUpdate = await UpdateDoc(thongtinDB.nameCollection, thongtinDB.nameDoc,soUpdate);
    if (ketQuaUpdate) {
        showNotification("Cập nhật thành công");
    } else {
        showNotification("Thất bại, xin thử lại");
    }
}

////////////////////////////////////////////////////////////// HÀM CỐ ĐỊNH

// Hàm lấy document từ collection
async function getData(nameCol) {
    try {
        let q = query(collection(db, nameCol));
        onSnapshot(q, (refsnap) => {
            let data = {};
            refsnap.forEach((doc) => {
                data[doc.id] = doc.data();
            });
            if (data[thongtinDB.nameDoc]) {
                soLanHienTai = data[thongtinDB.nameDoc].soLan; // Truy cập soLan từ tài liệu cụ thể
                ganThongTin(soLanHienTai);
            } else {
                console.log("Document not found!");
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function UpdateDoc(nameCol, nameDoc, newValue) {
    let ref = doc(db, nameCol, nameDoc);
    try {
        await setDoc(ref, { soLan: newValue }, { merge: true });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
