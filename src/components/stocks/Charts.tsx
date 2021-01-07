/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import {
  XYPlot,
  LineSeries,
  RVNearestXEventHandler,
  LineSeriesPoint,
  MarkSeries,
} from "react-vis";
import { MouseEvent } from "react";

interface IPoint {
  x: number;
  y: number;
}

export interface ISizing {
  width: number;
  height: number;
}

interface IQuoteChart extends ISizing {
  data: IPoint[];
  activePoint: IPoint;
  onNearest?: RVNearestXEventHandler<LineSeriesPoint>;
  onMouseLeave?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

export const QuoteChart = ({
  data,
  height,
  width,
  activePoint,
  onNearest,
  onMouseLeave,
  onMouseEnter,
}: IQuoteChart) => {
  return (
    <XYPlot
      width={width}
      height={height}
      margin={5}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ overflow: "visible" }}
    >
      <LineSeries
        color="#5971ff"
        data={data}
        style={{
          fillOpacity: 0,
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          boxShadow: "0 0 20px #e6ecf8",
        }}
        onNearestX={onNearest}
      />
      {activePoint && (
        <MarkSeries
          // @ts-ignore
          size={3}
          fill="white"
          stroke="#5971ff"
          style={{ pointerEvents: "none", strokeWidth: 2 }}
          data={[activePoint]}
        />
      )}
      {activePoint && (
        <MarkSeries
          // @ts-ignore
          size={15}
          fill="#5971ff"
          stroke="#5971ff"
          style={{ pointerEvents: "none", opacity: 0.25 }}
          data={[activePoint]}
        />
      )}
    </XYPlot>
  );
};

export const LoadingChart = ({ height, width }: ISizing) => {
  return <XYPlot width={width} height={height} margin={5}></XYPlot>;
};
