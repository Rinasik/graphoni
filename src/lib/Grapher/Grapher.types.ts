import { IAxes } from "../Axes/Axes.types";
import { Dot } from "../Graphoni/Graphoni.types";

export interface IGrapher {
  axes: IAxes;
  dotes: Dot[];
  readonly height: number;
  readonly width: number;
  readonly fontColor: string;
  readonly margin: number;
  readonly leftMargin: number;
}

export interface GrapherStyle {
  width: number;
  height: number;
  xSteps: number;
  ySteps: number;
  margin?: number;
  bgColor?: "white";
}
