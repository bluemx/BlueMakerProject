import lamejs from 'lamejs'

export const concatenateAudioBlobs = {
  async init(audioBlobs) {
    const blobToArrayBuffer = blob =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(blob)
      })

    const audioDataPromises = audioBlobs.map(blobToArrayBuffer)
    const audioDatas = await Promise.all(audioDataPromises)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const audioBufferPromises = audioDatas.map(data => audioContext.decodeAudioData(data))
    const audioBuffers = await Promise.all(audioBufferPromises)

    let offset = 0
    const totalLength = audioBuffers.reduce((length, buffer) => length + buffer.duration, 0)
    const outputBuffer = audioContext.createBuffer(audioBuffers[0].numberOfChannels, audioContext.sampleRate * totalLength, audioContext.sampleRate)

    audioBuffers.forEach((buffer) => {
      for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        const outputData = outputBuffer.getChannelData(channel)
        const inputData = buffer.getChannelData(channel)

        for (let sample = 0; sample < inputData.length; sample++)
          outputData[sample + offset] = inputData[sample]
      }

      offset += buffer.length
    })

    // convert outputBuffer to MP3 using lamejs
    const mp3encoder = new lamejs.Mp3Encoder(outputBuffer.numberOfChannels, outputBuffer.sampleRate, 128) // assuming 128 kbps bit rate
    const mp3Data = []
    let samples = outputBuffer.getChannelData(0) // assuming mono audio

    samples = samples.map(sample => sample * 32767.5) // convert float samples to 16-bit PCM
    samples = new Int16Array(samples)

    let mp3buf = mp3encoder.encodeBuffer(samples)
    if (mp3buf.length > 0)
      mp3Data.push(mp3buf)

    mp3buf = mp3encoder.flush() // finish encoding
    if (mp3buf.length > 0)
      mp3Data.push(mp3buf)

    const blob = new Blob(mp3Data, { type: 'audio/mp3' })

    return blob
  },
}
