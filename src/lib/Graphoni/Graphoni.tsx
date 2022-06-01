import { FC, useEffect, useRef } from "react";
import { Grapher } from "../Grapher";
import { Dot, GraphoniProps } from "./Graphoni.types";

export const Graphoni: FC<GraphoniProps> = ({
  color = "red",
  height,
  width,
  data,
  xSteps = 20,
  ySteps = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const grapher = new Grapher(data, { width, height, xSteps, ySteps });

  useEffect(() => {
    const ctx = canvasRef!.current!.getContext("2d");
    ctx && grapher.draw(ctx, color);
  }, [data]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};
