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
document.getElementById("cmdCopyButton").addEventListener("click",function(){copyText("cmdCopy")})
  setInputFilter(document.getElementById("amountInputBaoLo"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  }, "Only digits and '.' are allowed");

document.getElementById("amountInputBaoLo").addEventListener("change",function(){ConvertToVND(this.value,"BaoLo")})
document.getElementById("numberInputBaoLo").addEventListener("input",changeSoLoDe)
 



// Lấy ra số lần hiện tại từ document
getData(thongtinDB.nameCollection);

////////////////////////////////////////////////////////// HÀM THỰC THI
function changeSoLoDe(){
    let soLo = document.getElementById("numberInputBaoLo").value
    var characters = soLo.trim().split('');
    let count = 0
    let finalText = ""
    for (let i in characters){
        if(isDigit(characters[i])){
            finalText+=characters[i]
            count++
            if(count == 2){
                if(i == characters.length-1) return
                finalText+="-"
                count = 0
            }
        }      
    }
    document.getElementById('numberInputBaoLo').value = finalText
}

function isDigit(character) {
    return character >= '0' && character <= '9';
}

function ConvertToVND(numberInput,tenID){
    let tien = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberInput*1000)
}

function tinhTien(soLo,soTien){
        
}


// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value.
          if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
  
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        }
        else if (this.hasOwnProperty("oldValue")) {
          // Rejected value: restore the previous one.
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          // Rejected value: nothing to restore.
          this.value = "";
        }
      });
    });
  }




function ganThongTin(soLan) {
    document.getElementById("soLanDisplay").textContent = soLan;
    document.getElementById("username").value = "thisisforbgx" + soLan;
    let randomNumberPhone = generateRandomNumber(7);
    let randomNumberCCCD = generateRandomNumber(6);
    
    let textCMD = 'echo Numpad1:: Send thisisforbgx'+soLan+'@gmail.com> "C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad2:: Send thisisforbgx'+soLan+'>> "C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad3:: Send 111223hung>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad4:: Send hung>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad5:: Send thisisforbgx'+soLan+'@gmail.com>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad6:: Send 038'+randomNumberPhone+'>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad7:: Send HN>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'echo Numpad8:: Send 008202'+randomNumberCCCD+'>>"C:\\Users\\Administrator\\Documents\\hotkeys.txt" && ' +
              'start explorer /select, "C:\\Users\\Administrator\\Documents\\hotkeys.txt"';
    document.getElementById("cmdCopy").value = textCMD

}

function generateRandomNumber(n) {
    let randomNumber = '';
    for (let i = 0; i < n; i++) {
        randomNumber += Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9 và ghép vào chuỗi
    }
    return randomNumber;
}

function showNotification(message) {
    let notification = document.getElementById('notificationCopy');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function copyText(elementId) {
    let inputElement = document.getElementById(elementId);
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputElement.value).then(() => {
        showNotification('Đã sao chép vào clipboard');
    }).catch(err => {
        console.error('Sao chép vào clipboard thất bại: ', err);
    });
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
