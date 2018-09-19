var endpoint = '/'
var socket = io.connect(endpoint)

socket.emit('rtc-message', { message: "Hi!" })

socket.on('rtc-message', function(message) {
    console.log('Message from server:', message)
})