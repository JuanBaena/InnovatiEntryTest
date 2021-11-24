this.onmessage = function(e){
    recognizer.startContinuousRecognitionAsync();
    recognizer.recognized = function(s, e){
        console.log('recognizing text', e.result.text);
        this.postMessage(e.result.text);
    };
}
