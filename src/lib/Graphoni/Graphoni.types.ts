export type GraphoniData = {
  values: Dot[];
};

export type GraphoniProps = {
  width: number;
  height: number;
  xSteps?: number;
  ySteps?: number;
  data: GraphoniData;
  color?: "teal" | "red" | "blue";
  type?: "";
};

export interface Dot {
  x: number;
  y: number;
}
