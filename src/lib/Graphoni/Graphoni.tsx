import { FC, useEffect, useRef, useState } from "react";
import { Grapher } from "../Grapher";
import { GraphoniProps } from "./Graphoni.types";

export const Graphoni: FC<GraphoniProps> = ({
  color = "red",
  height,
  width,
  data,
  xSteps = 20,
  ySteps = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const topCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosX, setMousePosX] = useState(0);
  const grapher = new Grapher(data, { width, height, xSteps, ySteps });

  const mouseMove = (event: MouseEvent) => {
    setMousePosX(event.offsetX);
  };

  useEffect(() => {
    const ctx = canvasRef!.current!.getContext("2d");

    topCanvasRef &&
      (topCanvasRef.current!.style.top = `${canvasRef.current!.offsetTop}px`);
    topCanvasRef &&
      (topCanvasRef.current!.style.left = `${canvasRef.current!.offsetLeft}px`);

    ctx && grapher.drawAxes(ctx, color);
  }, []);

  useEffect(() => {
    const ctx = topCanvasRef!.current!.getContext("2d");
    topCanvasRef.current?.addEventListener("mousemove", mouseMove);
    ctx && grapher.drawDotTip(ctx, mousePosX);
    return canvasRef.current?.removeEventListener("mousemove", mouseMove);
  }, [mousePosX]);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={topCanvasRef}
        height={height}
        width={width}
        style={{ zIndex: 1, position: "absolute" }}
      />
    </>
  );
};
