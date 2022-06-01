
export interface IAxes {
    xAxis: {
      xSteps: number;
      xMax: number;
      xMin: number;
      ratio?: number;
    };
  
    yAxis: {
      ySteps: number;
      range: number;
      ratio?: number;
    };
    setRatio(
      height: number,
      width: number,
      margin: number,
      leftMargin: number
    ): void;
  }