import { FC, useEffect, useRef, useState } from "react";
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
  const [mousePosX, setMousePosX] = useState(0);
  const grapher = new Grapher(data, { width, height, xSteps, ySteps });

  const mouseMove = (event: MouseEvent) => {
    setMousePosX(event.offsetX);
  };

  useEffect(() => {
    canvasRef.current?.addEventListener("mousemove", (event) => mouseMove(event));
    const ctx = canvasRef!.current!.getContext("2d");
    ctx && grapher.draw(ctx, color, mousePosX);

    return canvasRef.current?.removeEventListener("mousemove", mouseMove);
  }, [mousePosX]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};
