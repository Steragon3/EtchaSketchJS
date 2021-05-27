import map from './midimapping.js'

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;

    for(var input of midiAccess.inputs.values()){
        input.onmidimessage = getMidiMessage;
    }
}

function getMidiMessage(midimessage){
    map(midimessage.data)
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}