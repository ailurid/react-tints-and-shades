import React, { Component, createRef, RefObject, ChangeEvent } from "react";

import ColourGridContainer from "./ColourGridContainer";

interface InputProps {}
interface InputState {
  parentData: string | null;
  transpose: boolean;
}

class Input extends Component<InputProps, InputState> {
  colourGridContainerElement: RefObject<any>;
  constructor(props: InputProps) {
    super(props);
    this.state = {
      parentData: null,
      transpose: false
    };
    this.colourGridContainerElement = createRef();
  }
  onInputChange = (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
    const inputValue = inputChangeEvent.target.value;
    this.setState({ parentData: inputValue });
    this.colourGridContainerElement.current.handleInputChange(inputValue);
  };
  onToggle = (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
    const inputValue = inputChangeEvent.target.checked;
    this.setState({ transpose: inputValue });
    this.colourGridContainerElement.current.handleToggle(inputValue);
  };
  render() {
    return (
      <div>
        <div className="inputContainer">
          <div className="input">
            <label>Enter hex colours (separated by spaces)</label>
            <input
              type="text"
              onChange={this.onInputChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="input">
            <label>Transpose</label>
            <input type="checkbox" onChange={this.onToggle} />
          </div>
        </div>
        <br />
        <br />
        <ColourGridContainer ref={this.colourGridContainerElement} />
      </div>
    );
  }
}

export default Input;
