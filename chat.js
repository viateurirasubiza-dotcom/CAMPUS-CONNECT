import { db, auth } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let currentUser = null;
let chatId = localStorage.getItem("chatId") || "group_s4";

/* 🔐 AUTH CHECK */
onAuthStateChanged(auth,(user)=>{
  if(user){
    currentUser = user;
    loadMessages();
  }else{
    window.location.href="index.html";
  }
});

/* 💬 LOAD MESSAGES (REALTIME + GROUP FILTER) */
function loadMessages(){

  const q = query(collection(db,"messages"), orderBy("time"));

  onSnapshot(q,(snap)=>{
    let box = document.getElementById("chatBox");
    box.innerHTML = "";

    snap.forEach(doc=>{
      let d = doc.data();

      // 🔥 FILTER GROUP / CHAT
      if(d.chatId !== chatId) return;

      let div = document.createElement("div");

      let isMe = (d.sender === currentUser.email);

      div.className = "msg " + (isMe ? "me" : "other");

      div.innerHTML = `
        <b>${isMe ? "You" : d.sender}</b><br>
        ${d.text}
      `;

      box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
  });
}

/* 📤 SEND MESSAGE */
window.sendMsg = async function(){

  let msg = document.getElementById("msg").value;

  if(msg.trim() === "") return;

  if(!currentUser) return;

  await addDoc(collection(db,"messages"),{
    text: msg,
    sender: currentUser.email,
    chatId: chatId,
    time: Date.now()
  });

  document.getElementById("msg").value="";
}
