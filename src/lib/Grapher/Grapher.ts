import { Axes } from "../Axes";
import { IAxes } from "../Axes/Axes.types";
import { Dot, GraphoniData } from "../Graphoni/Graphoni.types";
import { GrapherStyle, IGrapher } from "./Grapher.types";
const bgColor = "white";

export class Grapher implements IGrapher {
  axes: IAxes;
  dotes: Dot[];
  height: number;
  width: number;
  fontColor: string;
  margin: number;
  leftMargin: number;

  constructor(
    data: GraphoniData,
    {
      width,
      height,
      margin = 10,
      leftMargin = 30,
      xSteps,
      ySteps,
    }: GrapherStyle
  ) {
    this.fontColor = "grey";

    this.height = height;
    this.width = width;
    this.margin = margin;
    this.leftMargin = leftMargin;

    this.axes = new Axes(data, xSteps, ySteps);
    this.axes.setRatio(this.height, this.width, this.margin, this.leftMargin);
    this.dotes = data.values.map((elem) => ({
      x:
        (elem.x - this.axes.xAxis.xMin) * (this.axes.xAxis?.ratio || 0) +
        leftMargin,
      y: height - elem.y * (this.axes.yAxis?.ratio || 0) - this.margin,
    }));
    this.dotes.sort((a, b) => a.x - b.x);
  }

  draw(ctx: CanvasRenderingContext2D, color: string, mousePosX: number) {
    //Gradient
    const grd = ctx.createLinearGradient(0, 0, 0, this.height - this.margin);
    grd.addColorStop(0, color || "red");
    grd.addColorStop(1, bgColor);
    ctx.fillStyle = bgColor;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillRect(0, 0, this.width, this.height);
    //Draw dots
    ctx.font = `${this.margin}px sans-serif`;
    this.dotes.forEach((elem, index, dotes) => {
      if (index) {
        ctx.fillStyle = this.fontColor;

        ctx.beginPath();
        ctx.moveTo(dotes[index - 1].x, dotes[index - 1].y);
        ctx.lineTo(elem.x, elem.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(dotes[index - 1].x, dotes[index - 1].y);
        ctx.lineTo(elem.x, elem.y);
        ctx.lineTo(elem.x, this.height - this.margin);
        ctx.lineTo(dotes[index - 1].x, this.height - this.margin);

        ctx.closePath();

        ctx.fillStyle = grd;
        ctx.fill();
        if (
          mousePosX >= dotes[index - 1].x &&
          mousePosX <= elem.x
        ) {
          const slope = (elem.y - dotes[index - 1].y) /
          (elem.x - dotes[index - 1].x);
          const nullY = elem.y - slope*elem.x;

          const tipY = mousePosX * slope + nullY;
            ctx.fillStyle = this.fontColor;
            ctx.beginPath();
            ctx.arc(mousePosX, tipY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
      }
    });
    //yAxis
    ctx.fillStyle = this.fontColor;
    ctx.beginPath();
    ctx.moveTo(this.leftMargin, this.height - this.margin);
    ctx.lineTo(this.leftMargin, this.margin);
    for (let i = 0; i <= this.axes.yAxis.ySteps; i++) {
      const aYStep = (this.height - 2 * this.margin) / this.axes.yAxis.ySteps;
      ctx?.fillText(
        `${Math.round((i * this.axes.yAxis.range) / this.axes.yAxis.ySteps)}`,
        0,
        this.height - i * aYStep - this.margin / 2,
        this.leftMargin
      );
    }
    ctx.stroke();
    //xAxis
    ctx.beginPath();
    ctx.moveTo(this.leftMargin, this.height - this.margin);
    ctx.lineTo(this.width - this.margin, this.height - this.margin);
    ctx.stroke();
    for (let i = 0; i <= this.axes.xAxis.xSteps; i++) {
      const aXStep =
        (this.width - this.margin - this.leftMargin) / this.axes.xAxis.xSteps;
      ctx?.fillText(
        `${Math.round(
          (i * (this.axes.xAxis.xMax - this.axes.xAxis.xMin)) /
            this.axes.xAxis.xSteps +
            this.axes.xAxis.xMin
        )}`,
        i * aXStep + this.leftMargin - this.margin,
        this.height,
        2 * this.margin
      );
    }

  }
}
