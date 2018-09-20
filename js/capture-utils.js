const { desktopCapturer } = require('electron')

function filterSource(sources) {
    const possibleScreens = ['Screen 1', 'Entire screen']
    return sources.find(source => possibleScreens.includes(source.name))
}

function getSources() {
    return new Promise((resolve, reject) => {
        const options = { types: ['screen'] }
        const handleResult = (error, sources) => error ? reject(error) : resolve(sources)
        desktopCapturer.getSources(options, handleResult)
    })
}

function getSourceId(callback) {
    getSources().then(sources => {
        console.log(sources)
        let source = filterSource(sources)
        callback(source.id)
    }).catch(console.error)
}

module.exports = {
    getSourceId
}