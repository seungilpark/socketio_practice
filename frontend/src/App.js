import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: "",
      connected:false,
      messages: [],
      textInput: "",
      socket:socketIOClient("http://127.0.0.1:4000")
    }
  }

  componentDidMount() {
    this.state.socket.on("init", uid => this.setState({ userId: uid }));
    this.state.socket.on("chat", data =>
      this.setState({ messages: this.state.messages.concat(data) })
    );
  }

  render() {
    return (
      <div className="app">
        <h2 style={{textAlign:"center"}}>{this.state.userId}</h2>
        <div className="messages">
          {this.state.messages.map(data => (
            <div 
              className={data.user === this.state.userId ? "MyChat":"YourChat"}
              >
              {data.user} : {data.msg}
            </div>
          ))}
        </div>
        <div className="inputBox">
          <input
            onChange={e => this.setState({ textInput: e.target.value })}
            value={this.state.textInput}
            className="text"
            type="text"
            onKeyPress={e => {
              if (e.key === "Enter") {
                console.log(this.state.userId)
                console.log("onKeyPress, Enter");
                //emit and setstate
                const msg = {
                  user: this.state.userId,
                  msg: this.state.textInput
                }

                this.state.socket.emit("chat", msg);
                this.setState({ messages:this.state.messages.concat(msg), textInput: "" });
              }
            }}
          />

        </div>
      </div>
    );
  }
}

export default App;
