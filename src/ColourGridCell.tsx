import React, { Component } from "react";

export interface ColourGridCellProps {
  colourIndex: number;
  toneIndex: number;
  transpose: boolean;
  label: string;
  renderColour?: string;
}
interface ColourGridCellState {}

export class ColourGridCell extends Component<
  ColourGridCellProps,
  ColourGridCellState
> {
  constructor(props: ColourGridCellProps) {
    super(props);
    this.state = {};
  }
  showToneBox() {
    if (this.props.renderColour) {
      return (
        <div
          className="toneBox"
          style={{
            height: this.props.transpose ? "15px" : "100%",
            width: this.props.transpose ? "100%" : "45px",
            backgroundColor: `#${this.props.renderColour}`
          }}
        />
      );
    }
  }
  render() {
    return (
      <div
        className="gridCell"
        style={{
          flexDirection: this.props.transpose ? "column" : "row",
          gridRow: `${
            this.props.transpose ? this.props.colourIndex : this.props.toneIndex
          } / span 1`,
          gridColumn: `${
            this.props.transpose ? this.props.toneIndex : this.props.colourIndex
          } / span 1`
        }}
      >
        {this.showToneBox()}
        <div
          className="toneLabel"
          style={{
            fontWeight: this.props.toneIndex === 11 ? "bold" : "normal"
          }}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
