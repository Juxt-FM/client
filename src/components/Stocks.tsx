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
import { ApolloError, useQuery } from "@apollo/client";
import {
  CompanyProfile,
  StockNews,
  BlogPost,
  IntradayRecord,
  QUERY_FILTER_POSTS,
  QUERY_INTRADAY_REOCRDS,
} from "../graphql";
import { useCurrentBreakpoint } from "../context";
import { AutoSizer, Size } from "react-virtualized";
import moment from "moment";
import _ from "lodash";

import { LoadingChart, QuoteChart } from "./Charts";
import { NewsArticle } from "./News";
import { SampleList } from "./SampleList";
import { ListItem, LoadingListItem } from "./BlogPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";

import { LineSeriesPoint } from "react-vis";

import styles from "../styles/modules/stocks.module.scss";

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
      const close = data.intradayRecords.map(({ close }, index) => ({
        x: index,
        y: close,
      }));

      return (
        <QuoteChart
          data={close}
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

const BlogPosts = ({
  symbol,
  posts,
}: {
  symbol: string;
  posts: BlogPost[];
}) => {
  const renderPost = (post: BlogPost) => <ListItem post={post} key={post.id} />;

  const onData = ({
    filterBlogPosts,
  }: {
    filterBlogPosts: BlogPost[];
  }): React.ReactNode => {
    return (
      <div className={styles.row}>
        <div className={styles.column}>{filterBlogPosts.map(renderPost)}</div>
        <div className={styles.column}>
          {filterBlogPosts.map((item, index) =>
            renderPost(filterBlogPosts[index === 1 ? 0 : 1])
          )}
        </div>
      </div>
    );
  };

  const onLoading = (): React.ReactNode | null => {
    return (
      <div className={styles.row}>
        <div className={styles.column}>
          {_.range(3).map((index) => (
            <LoadingListItem key={"1" + String(index)} />
          ))}
        </div>
        <div className={styles.column}>
          {_.range(3).map((index) => (
            <LoadingListItem key={"2" + String(index)} />
          ))}
        </div>
      </div>
    );
  };

  const onError = (error: ApolloError): React.ReactNode | null => {
    return null;
  };

  return (
    <div className={styles.content}>
      <div className={styles.recentPosts}>
        <SampleList
          title="Recent Posts"
          summary={`Recent blog posts for ${symbol}.`}
          query={QUERY_FILTER_POSTS}
          content={{ onLoading, onData: onLoading, onError }}
        />
      </div>
    </div>
  );
};

const News = ({ news }: { news: StockNews[] }) => {
  const renderArticle = (item: StockNews) => (
    <NewsArticle {...item} key={item.url} />
  );

  return (
    <Fragment>
      <h3>Recent News</h3>
      {news.map(renderArticle)}
    </Fragment>
  );
};

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
        <News news={stock.news} />
      </div>
    </div>
  );
};

const StockSymbol = ({ stock }: { stock: CompanyProfile }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <div className={styles.stockRoot}>
      <div className={styles.splitContent}>
        <div className={styles.content}>
          <HistoricalData symbol={stock.symbol} />
          <CompanyDetails stock={stock} />
        </div>
        {!["xs", "sm", "md"].includes(breakpoint) && (
          <div>
            <WatchlistAction />
          </div>
        )}
      </div>
      <BlogPosts symbol={stock.symbol} posts={[]} />
    </div>
  );
};

export default StockSymbol;
