//const io = require("socket.io-client") //function we can call to get an individual socket
const socket= io()
let textarea= document.querySelector('#textarea')
let messagearea= document.querySelector('.message__area')
let name1;
do{
   name1 = prompt('Please enter your name: ')
}while(!name1)
textarea.addEventListener('keyup', (e) => { //e is the reference to the object which contains information about the event that has just occured
    if(e.key ==='Enter'){
       // console.log(e.target.value)
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {

    let msg= {
        user: name1,
        message  : message.trim()// eta kora hoy jate cursor next line na jay
    }
    
    appendMessage(msg, 'outgoing') // server e pouchonor age innerhtml e dakhano hbe message tai okhne append
    textarea.value = ''
    scrollToBottom()

    //send appendMessage to server
    socket.emit('message',msg)
}

// Recieve messages from server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function appendMessage(msg , type){
    
    let mainDiv= document.createElement('div')
    let className= type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
   
    mainDiv.innerHTML= markup
    console.log(`${messagearea}`)
     messagearea.appendChild(mainDiv)

}



function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}
