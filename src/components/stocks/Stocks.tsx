/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import {
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { useQuery } from "@apollo/client";
import {
  CompanyProfile,
  StockNews,
  IntradayRecord,
  QUERY_INTRADAY_REOCRDS,
} from "../../lib/graphql";
import { AutoSizer, Size } from "react-virtualized";
import moment from "moment";
import _ from "lodash";

import { LoadingChart, QuoteChart } from "./Charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { LineSeriesPoint } from "react-vis";

import styles from "../../styles/stocks/stocks.module.scss";

interface ITimeframeSwitch {
  timeframe: string;
  activeTimeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}

const TimeframeSwitch = ({
  timeframe,
  activeTimeframe,
  setTimeframe,
}: ITimeframeSwitch) => {
  const onClick = () => {
    setTimeframe(timeframe);
  };
  return (
    <a
      className={[
        styles.timeframeSwitch,
        timeframe === activeTimeframe ? styles.active : "",
      ].join(" ")}
      onClick={onClick}
    >
      {timeframe}
    </a>
  );
};

const HistoricalData = ({ symbol }: { symbol: string }) => {
  const [activeBar, setActiveBar] = useState<
    { item: IntradayRecord; index: number } | undefined
  >(undefined);

  const [timeframe, setTimeframe] = useState("1min");

  const { data } = useQuery<{ intradayRecords: IntradayRecord[] }>(
    QUERY_INTRADAY_REOCRDS,
    {
      variables: {
        symbol,
        timeframe,
      },
      onCompleted: ({ intradayRecords }) => {
        const pos = intradayRecords.length - 1;
        setActiveBar({ item: intradayRecords[pos], index: pos });
      },
      ssr: false,
    }
  );

  const onActiveChange = (point: LineSeriesPoint, info: any) => {
    setActiveBar({ item: data.intradayRecords[point.x], index: info.index });
  };

  const onMouseLeave = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const index = data.intradayRecords.length - 1;
    setActiveBar({ item: data.intradayRecords[index], index });
  };

  const renderChart = ({ height, width }: Size) => {
    if (data) {
      const chartData = data.intradayRecords.map(({ close }, index) => ({
        x: index,
        y: close,
      }));

      return (
        <QuoteChart
          data={chartData}
          height={height}
          width={width}
          activePoint={
            activeBar
              ? { x: activeBar.index, y: activeBar.item.close }
              : undefined
          }
          onNearest={onActiveChange}
          onMouseLeave={onMouseLeave}
        />
      );
    }
    return <LoadingChart height={height} width={width} />;
  };

  return (
    <div className={styles.mainChart}>
      <div className={styles.close}>
        <h1>{activeBar ? activeBar.item.close.toFixed(2) : "0.00"}</h1>
        {activeBar && (
          <p>
            {moment(parseInt(activeBar.item.timestamp, 10)).format(
              "MMMM DD, YYYY hh:mmA"
            )}
          </p>
        )}
      </div>
      <div className={styles.chartWrapper}>
        <AutoSizer>{renderChart}</AutoSizer>
      </div>
      <div className={styles.timeframeWrapper}>
        {["1min", "5min", "15min", "30min"].map((val) => (
          <TimeframeSwitch
            key={val}
            timeframe={val}
            activeTimeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        ))}
      </div>
    </div>
  );
};

const WatchlistAction = () => {
  return (
    <div className={styles.stickySection}>
      <div className={styles.content}>
        <h4>Add to watchlist</h4>
        <a className={styles.action}>
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
    </div>
  );
};

interface IHeader {
  name: string;
}

export const Header = ({ name }: IHeader) => (
  <h1 className={styles.symbol}>{name}</h1>
);

const CompanyDetails = ({ stock }: { stock: CompanyProfile }) => {
  return (
    <div className={styles.companyDetails}>
      <div className={styles.header}>
        <img src={stock.image} alt="stock image" />
        <p className={styles.name}>{stock.companyName}</p>
      </div>
      <div className={styles.content}>
        <h3>About</h3>
        <p className={styles.description}>{stock.description}</p>
        <div className={styles.attribute}></div>
      </div>
    </div>
  );
};

const StockSymbol = ({ stock }: { stock: CompanyProfile }) => {
  return (
    <div className={styles.stockRoot}>
      <div className={styles.splitContent}>
        <div className={styles.content}>
          <HistoricalData symbol={stock.symbol} />
          <CompanyDetails stock={stock} />
        </div>
        <WatchlistAction />
      </div>
    </div>
  );
};

export default StockSymbol;
