import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from './token_util';
import './custom.css'
import Unity, { UnityContent } from "react-unity-webgl";


const speechsdk = require('microsoft-cognitiveservices-speech-sdk')
var MicrophoneStatusON = false;
var tokenObj;
var speechConfig;
var audioConfig;
var recognizer;
var message = "";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: 'Listo para escucharte ...'
        }
        this.unityContent = new UnityContent("UnityPublic/Build/TestInnovati.json","UnityPublic/Build/UnityLoader.js");
    }
          
    async componentDidMount() {
        // check for valid speech key/region
        const tokenRes = await getTokenOrRefresh();
        setInterval(this.TimeUnity, 10);
        if (tokenRes.authToken === null) {
            this.setState({
                displayText: 'FATAL_ERROR: ' + tokenRes.error
            });
        }
    }

    TimeUnity = () => {
        if(message=="subir"){
            console.log("llega a unity", message);
            this.unityContent.send('Player', 'Up');
            message="";
        }
        else if(message=="bajar"){
            console.log("llega a unity", message);
            this.unityContent.send('Player', 'Down');
            message="";
        }
    }

    async sttFromMic() {
        MicrophoneStatusON= !MicrophoneStatusON;
   
        if(MicrophoneStatusON===false){
            recognizer.stopContinuousRecognitionAsync();
            recognizer.close();
            this.setState({
                displayText: 'Micrófono apagado'
            });
        }
        else if(MicrophoneStatusON===true){
            this.setState({
                displayText: 'Escuchando, Habla a tu micrófono...'
            });
            tokenObj = await getTokenOrRefresh();
            speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
            speechConfig.speechRecognitionLanguage = 'es-CO';
            audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
            recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)
            recognizer.startContinuousRecognitionAsync();
            recognizer.recognizing = function(s, e){
                console.log('recognizing text:', e.result.text);
                    if(e.result.text=="subir" || e.result.text=="Subir." || e.result.text=="Subir"){
                        message= "subir";
                    }
                    if(e.result.text=="bajar" || e.result.text=="Bajar." || e.result.text=="Bajar"){
                        message= "bajar";
                    }
                }
        }
    }

    render() {
        return (  
            <Container className="app-container">
                <h1 className="display-4 mb-3">Test Innovati Juan Baena</h1>
                <Unity unityContent={this.unityContent} height="100%" width="700px"/>
                <div className="row main-container">
                    <div className="col-6 ">
                        <i className="fas fa-microphone fa-lg mr-2" onClick={() => this.sttFromMic()}></i>
                        Activar/Desactivar Micrófono.
                    </div>
                    <div className="col-6 output-display rounded">
                        <code>{this.state.displayText}</code>
                    </div>
                </div>
            </Container>
        );
    }
}