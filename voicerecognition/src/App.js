import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
class App extends Component {
  constructor(){
    super();
    this.state = {};

  }
  onListeClick(){
   // fetch(' https://gateway-lon.watsonplatform.net/speech-to-text/api')
   fetch('http://localhost:3002/api/speech-to-text/token')
  .then(function(response) {
      return response.text();
  }).then((token)=> {
    var stream = recognizeMic({
        token: token, // use `access_token` as the parameter name if using an RC service
        objectMode: true, // send objects instead of text
        extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        format: false // optional - performs basic formatting on the results such as capitals an periods
    });
    stream.on('data', (data) => {
      console.log(data);
      this.setState({
       text:data.alternatives[0].transcript
        })   
    });
    stream.on('error', function(err) {
        console.log(err);
    });
    document.querySelector('#stop').onclick = stream.stop.bind(stream);
  }).catch(function(error) {
      console.log(error);
  });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <button onClick={this.onListeClick.bind(this)}>Listen to michrofone </button>
    <div> {this.state.text}</div>
        </header>
      </div>
    );
  }
}

export default App;
