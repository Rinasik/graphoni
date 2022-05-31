import { FC, useEffect, useRef } from "react";
import { Dot, GraphoniProps } from "./Graphoni.types";
const bgColor = "white";
const fontColor = "grey";

const leftMargin = 30;
const otherMargin = 10;

export const Graphoni: FC<GraphoniProps> = ({
  color,
  height,
  width,
  data,
  xSteps = 20,
  ySteps = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const yRange = Math.round(
    1.1 * data.values.reduce((max, elem) => (max <= elem.y ? elem.y : max), 0)
  );
  const xMax = data.values.reduce(
    (max, elem) => (max <= elem.x ? elem.x : max),
    0
  );
  const xMin = data.values.reduce((minElem, currElem) =>
    minElem.x >= currElem.x ? currElem : minElem
  ).x;
  const xRange = xMax - xMin;

  const xRatio = (width - leftMargin - otherMargin) / xRange;
  const yRatio = (height - 2 * otherMargin) / yRange;

  const dotes: Dot[] = data.values.map((elem) => ({
    x: (elem.x - xMin) * xRatio + leftMargin,
    y: height - elem.y * yRatio - otherMargin,
  }));
  dotes.sort((a, b) => a.x - b.x);

  useEffect(() => {
    const ctx = canvasRef!.current!.getContext("2d");
    const grd = ctx!.createLinearGradient(0, 0, 0, height - otherMargin);
    grd.addColorStop(0, color || "red");
    grd.addColorStop(1, bgColor);
    ctx!.fillStyle = bgColor;
    ctx?.clearRect(0, 0, width, height);
    ctx?.fillRect(0, 0, width, height);

    ctx!.font = `${otherMargin}px sans-serif`;
    dotes.forEach((elem, index) => {
      if (index) {
        ctx!.fillStyle = fontColor;

        ctx!.beginPath();
        ctx!.moveTo(dotes[index - 1].x, dotes[index - 1].y);
        ctx!.lineTo(elem.x, elem.y);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.moveTo(dotes[index - 1].x, dotes[index - 1].y);
        ctx!.lineTo(elem.x, elem.y);
        ctx!.lineTo(elem.x, height - otherMargin);
        ctx!.lineTo(dotes[index - 1].x, height - otherMargin);

        ctx!.closePath();

        ctx!.fillStyle = grd;
        ctx!.fill();
      }
    });

    ctx!.fillStyle = fontColor;

    for (let i = 1; i <= ySteps; i++) {
      const aYStep = (height - 2 * otherMargin) / ySteps;
      ctx?.fillText(
        `${Math.round((i * yRange) / ySteps)}`,
        0,
        height - i * aYStep - otherMargin / 2,
        leftMargin
      );
    }
    ctx!.stroke();

    ctx!.beginPath();
    ctx!.moveTo(leftMargin, height - otherMargin);
    ctx!.lineTo(width - otherMargin, height - otherMargin);
    ctx!.stroke();
    for (let i = 0; i <= xSteps; i++) {
      const aXStep = (width - otherMargin - leftMargin) / xSteps;
      ctx?.fillText(
        `${Math.round((i * xRange) / xSteps + xMin)}`,
        i * aXStep + leftMargin - otherMargin,
        height,
        2 * otherMargin
      );
    }
  }, [dotes]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};
