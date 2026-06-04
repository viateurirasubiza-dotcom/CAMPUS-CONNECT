import { storage, db, auth } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.sendFile = async function(){

  let file = document.getElementById("file").files[0];

  if(!file) return;

  let fileRef = ref(storage,"files/"+file.name);

  await uploadBytes(fileRef,file);

  let url = await getDownloadURL(fileRef);

  await addDoc(collection(db,"messages"),{
    text: "📎 File",
    fileURL: url,
    sender: auth.currentUser.email,
    time: Date.now()
  });
}
