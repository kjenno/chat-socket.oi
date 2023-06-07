const socket = io('http://localhost:8080')
const messageContainer = document.getElementById('message-container')   // maakt een constante aan voor de message container (de grote chatbox)
const messageForm = document.getElementById('send-container')           // maakt een constante aan voor de kleine text form waar je de text in typt en de knop in staat
const messageInput = document.getElementById('message-input')           //stopt de getypte letters in de variable messageInput

const name = prompt('What is your name?')     // maakt een popup en vraagt voor je naam 
appendMessage('You joined')                   // geeft de message in de chatbox "you joined"
socket.emit('new-user', name)                 //zend de naam uit naar de server en word aangegeven aan de rest dat je gejoind bent

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)      // kijkt of er berichten verstuurd zijn zo ja dan worden deze met behulp van de functie "appendMessage"weergegeven
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)                  // deze kijkt of er gebruikers verbinden zo ja word dat ook weergegeven met de functie appendmessage
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)               // kijkt of gebruikers de chat verlaten en zo ja dan word dat weergegeven met de functie appendmessage
})

messageForm.addEventListener('submit', e => {         // als je op de submit knop klikt dan word de tekst in het teks vak naar de server gestuurt en word het teksvlak leeg gemaakt
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')  // maakt een nieuwe div aan en stop daar de bijbehorende data in bijvoorbeeld de berighten
  messageElement.innerText = message
  messageContainer.append(messageElement)
}