/* Implementation of Join Chat Button  */
const socket=io();
let username=""; 
document.getElementById("join-btn").addEventListener("click",(event)=>{
   event.preventDefault();

   username=document.getElementById("username-input").value;
   if(username.trim()!=""){
    document.querySelector(".form-username").style.display="none";
    document.querySelector(".chatroom-container").style.display="block";
    document.querySelector(".chatroom-header").innerText=`Chatroom - ${username}`; 
  }else{
     alert("Username cannot be empty");
   }
   }); 
 /*Implementation on send button text added to UI */
document.getElementById("send-btn").addEventListener("click",(event)=>{
   event.preventDefault();

//inform socket.io
const data = {
   username: username,
   message: document.getElementById("message-input").value,
 };
 socket.emit("chat message",data);
 addMessage(data, true);
});
//receive message
socket.on("chat message",(data)=>{
  if(data.username!==username){
   addMessage(data,false);
  }
});

function addMessage(data,flag){
   var msgDiv=document.createElement("div");
   msgDiv.innerText=`${data.username}:${data.message}`; 
   if(flag){
      msgDiv.setAttribute("class", "message sent");
   }else{
      msgDiv.setAttribute("class", "message received");
   }
   
   document.querySelector("#message-container").appendChild(msgDiv); 
}

