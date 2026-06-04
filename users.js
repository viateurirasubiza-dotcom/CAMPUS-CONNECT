import { db, auth } from "./firebase.js";
import { doc, setDoc, collection, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SET ONLINE
function setOnline(status){
  setDoc(doc(db,"users",auth.currentUser.uid),{
    email: auth.currentUser.email,
    online: status,
    lastSeen: Date.now()
  },{merge:true});
}

window.addEventListener("load",()=>setOnline(true));
window.addEventListener("beforeunload",()=>setOnline(false));

// SHOW USERS
onSnapshot(collection(db,"users"),snap=>{
  let box = document.getElementById("usersBox");
  box.innerHTML="";

  snap.forEach(u=>{
    let d=u.data();

    let div=document.createElement("div");
    div.className="msg";

    div.innerHTML=`
      ${d.email}
      ${d.online ? "🟢 Online" : "⚫ Offline"}
    `;

    box.appendChild(div);
  });
});
