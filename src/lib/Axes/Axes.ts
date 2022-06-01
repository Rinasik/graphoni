import { GraphoniData } from "../Graphoni/Graphoni.types";
import { IAxes } from "./Axes.types";

export class Axes implements IAxes {
  xAxis: {
    xSteps: number;
    xMax: number;
    xMin: number;
    ratio?: number | undefined;
  };
  yAxis: {
    ySteps: number;
    range: number;
    ratio?: number | undefined;
  };
  constructor(data: GraphoniData, xSteps: number, ySteps: number) {
    this.yAxis = {
      range: Math.round(
        1.1 *
          data.values.reduce((max, elem) => (max <= elem.y ? elem.y : max), 0)
      ),
      ySteps,
    };

    this.xAxis = {
      xMax: data.values.reduce(
        (max, elem) => (max <= elem.x ? elem.x : max),
        0
      ),
      xMin: data.values.reduce((minElem, currElem) =>
        minElem.x >= currElem.x ? currElem : minElem
      ).x,
      xSteps,
    };
  }

  setRatio(height: number, width: number, margin: number, leftMargin: number) {
    this.xAxis.ratio =
      (width - leftMargin - margin) / (this.xAxis.xMax - this.xAxis.xMin);
    this.yAxis.ratio = (height - 2 * margin) / this.yAxis.range;
  }
}
