/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ApolloError, DocumentNode, useQuery } from "@apollo/client";

import styles from "../styles/modules/sample-list.module.scss";

interface IBaseSampleList {
  title: string;
  summary?: string;
  children: React.ReactNode;
  dark: boolean;
}

export const BaseSampleList = ({
  title,
  summary,
  children,
  dark = false,
}: IBaseSampleList) => (
  <div>
    <div className={[styles.header, dark ? styles.dark : ""].join(" ")}>
      <h1>{title}</h1>
      <p>{summary}</p>
    </div>
    {children}
  </div>
);

interface ISampleList {
  title: string;
  summary?: string;
  dark?: boolean;
  query: DocumentNode;
  content: {
    onLoading: () => React.ReactNode;
    onData: (data: any) => React.ReactNode | null;
    onError: (error: ApolloError) => React.ReactNode | null;
  };
}

export const SampleList = ({
  title,
  summary,
  query,
  content,
  dark,
}: ISampleList) => {
  const { data, loading, error } = useQuery(query, {
    variables: {
      filters: {
        symbols: ["NVDA", "QQQ"],
        limit: 10,
        offset: 0,
      },
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const renderContent = () => {
    const { onLoading, onData, onError } = content;
    if (typeof data !== "undefined") return onData(data);
    else if (loading) return onLoading();
    else return onError(error);
  };

  return (
    <BaseSampleList title={title} summary={summary} dark={dark}>
      {renderContent()}
    </BaseSampleList>
  );
};
