import { db, auth } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let chatId = localStorage.getItem("chatId") || "dm_global";

const q = query(collection(db,"messages"), orderBy("time"));

onSnapshot(q,(snap)=>{
  let box = document.getElementById("chatBox");
  box.innerHTML = "";

  snap.forEach(doc=>{
    let d = doc.data();

    if(d.chatId === chatId){
      let div = document.createElement("div");
      div.className = "msg";

      div.innerHTML = `
        <b>${d.sender}</b><br>
        ${d.text}
      `;

      box.appendChild(div);
    }
  });
});

window.sendMsg = async function(){

  let msg = document.getElementById("msg").value;
  if(msg.trim() === "") return;

  await addDoc(collection(db,"messages"),{
    text: msg,
    sender: auth.currentUser.email,
    chatId: chatId,
    time: Date.now()
  });

  document.getElementById("msg").value="";
}
