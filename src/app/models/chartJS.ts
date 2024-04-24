export interface DataPoint {
  x: Date;
  y: number;
}

interface AxisY {
  labelFormatter: (e: any) => string;
}

interface Data {
  type: string;
  xValueFormatString: string;
  yValueFormatString: string;
  dataPoints: DataPoint[];
}

interface Title {
  text: string;
}

export interface ChartOptions2 {
  theme: string;
  animationEnabled: boolean;
  zoomEnabled: boolean;
  title: Title;
  axisY: AxisY;
  data: Data[];
}
