import React, { Component } from "react";

import Input from "./Input";

import "./styles.css";

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Input />
        <p className="thankyou">
          Credit and thanks are due to the makers of the excellent{" "}
          <a href="https://maketintsandshades.com">Tint and Shade Generator</a>{" "}
          for the colour value calculation logic.
        </p>
      </div>
    );
  }
}

export default App;
