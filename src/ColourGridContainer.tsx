import React, { Component } from "react";
import {
  parseColorValues,
  calculate,
  rgbShade,
  rgbTint
} from "./tints-and-shades";

import { ColourGridCell, ColourGridCellProps } from "./ColourGridCell";

function uniqueArray(arr: any[]) {
  return arr.filter((elem, pos, array) => {
    return array.indexOf(elem) === pos;
  });
}

function calculateTones(inputColour: string): string[] {
  const shades: string[] = calculate(inputColour, rgbShade);
  const tints: string[] = calculate(inputColour, rgbTint);
  let tones = ["ffffff"];
  tints.reverse().forEach((tint) => {
    tones.push(tint);
  });
  shades.forEach((shade) => {
    tones.push(shade);
  });
  tones.push("000000");
  tones = uniqueArray(tones);
  return tones;
}

const rowLabels: string[] = [
  "100%",
  "90%",
  "80%",
  "70%",
  "60%",
  "50%",
  "40%",
  "30%",
  "20%",
  "10%",
  "base",
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%"
];

interface ColourGridContainerProps {}
interface ColourGridContainerState {
  inputData: string | null;
  parsedColourValues: string[];
  transpose: boolean;
}

class ColourGridContainer extends Component<
  ColourGridContainerProps,
  ColourGridContainerState
> {
  constructor(props: ColourGridContainerProps) {
    super(props);
    this.state = {
      inputData: null,
      parsedColourValues: [],
      transpose: false
    };
  }
  handleInputChange = (inputValue: string | null) => {
    this.setState({
      inputData: inputValue,
      parsedColourValues: parseColorValues(inputValue)
    });
  };
  handleToggle = (inputValue: boolean) => {
    this.setState({
      transpose: inputValue
    });
  };
  render() {
    if (this.state.parsedColourValues?.length > 0) {
      const parsedColourValues = this.state.parsedColourValues ?? [];
      const addHeaders = 2;
      const rowCount = this.state.transpose
        ? addHeaders + parsedColourValues.length
        : rowLabels.length;
      const columnCount = this.state.transpose
        ? rowLabels.length
        : addHeaders + parsedColourValues.length;
      const colourTones: string[][] = parsedColourValues.map(
        (colour, colourIndex) => calculateTones(colour)
      );
      let gridCells: ColourGridCellProps[] = [];
      rowLabels.forEach((rowLabel, rowLabelIndex) => {
        gridCells.push({
          colourIndex: 2,
          toneIndex: 1 + rowLabelIndex,
          transpose: this.state.transpose,
          label: rowLabel
        });
      });
      colourTones.forEach((colour, colourIndex) => {
        colour.forEach((tone, toneIndex) => {
          gridCells.push({
            colourIndex: addHeaders + 1 + colourIndex,
            toneIndex: 1 + toneIndex,
            transpose: this.state.transpose,
            label: tone,
            renderColour: tone
          });
        });
      });
      return (
        <div
          className="gridContainer"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            gridTemplateRows: `repeat(${rowCount}, 1fr)`
          }}
        >
          <div
            className="gridCell"
            style={{
              gridRow: `${1} / span ${this.state.transpose ? 1 : 10}`,
              gridColumn: `${1} / span ${this.state.transpose ? 10 : 1}`,
              padding: "0px 5px"
            }}
          >
            tint
          </div>
          <div
            className="gridCell"
            style={{
              gridRow: `${this.state.transpose ? 1 : 12} / span ${
                this.state.transpose ? 1 : 10
              }`,
              gridColumn: `${this.state.transpose ? 12 : 1} / span ${
                this.state.transpose ? 10 : 1
              }`,
              padding: "0px 5px"
            }}
          >
            shade
          </div>
          {gridCells.map((cell) => (
            <ColourGridCell
              key={`cell-${cell.colourIndex}-${cell.toneIndex}`}
              colourIndex={cell.colourIndex}
              toneIndex={cell.toneIndex}
              transpose={cell.transpose}
              label={cell.label}
              renderColour={cell.renderColour}
            />
          ))}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ColourGridContainer;
