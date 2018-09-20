const { getSourceId } = require('./js/capture-utils')

const electron = require('electron')
const { width, height } = electron.screen.getPrimaryDisplay().size

const endpoint = 'http://localhost:8888'
const socket = io.connect(endpoint)

const config = {
    iceServers: [{
        url: 'stun:stun.l.google.com:19302'
    }]
}

let peers = []
let localStream = null

socket.on('rtc-message', handleMessage)

boot()

function boot() {
    getSourceId(streamId => {
        captureScreen(streamId, stream => {
            console.log('captureScreen - stream:', stream)
            localStream = stream
        })
    })
}

function captureScreen(streamId, callback) {
    const mediaConstraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
                minWidth: width,
                minHeight: height,
                maxWidth: width,
                maxHeight: height
            }
        }
    }
    console.log('captureScreen - called with mediaConstraints: ', mediaConstraints)
    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(callback)
        .catch(console.error)
}

function handleMessage(message) {
}

function sendMessage(message) {
}

function initPeerConnections(clientId, stream) {
}

function handleIceCandidate(event) {
}

function handleSessionDescription(sdp) {
}

function createPeerConnection(clientId) {
}