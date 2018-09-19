
var endpoint = 'http://localhost:8888'
var socket = io.connect(endpoint)

socket.emit('rtc-message', {
    message: "Hi from Electron!"
})

socket.on('rtc-message', function (message) {
    console.log('Message from server:', message)
})