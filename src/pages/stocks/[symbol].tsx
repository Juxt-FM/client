/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  QUERY_TICKER,
  CompanyProfile,
  initializeApollo,
  addApolloState,
} from "../../lib/apollo";

import Page from "../../components/Page";
import StockSymbol, { Header } from "../../components/Stocks";

interface IStockDetailsQuery {
  companyProfile: CompanyProfile;
}

const SymbolDetails = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const { data } = useQuery<IStockDetailsQuery>(QUERY_TICKER, {
    variables: { symbol },
  });

  return (
    <Page
      title={`${symbol || "Stocks"}`}
      description={`Check out ${symbol} on Hedger.`}
    >
      <Header name={data ? data.companyProfile.companyName : undefined} />
      <StockSymbol stock={data ? data.companyProfile : undefined} />
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { symbol: "NVDA" } },
      { params: { symbol: "TSLA" } },
      { params: { symbol: "QQQ" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  try {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: QUERY_TICKER,
      variables: params,
    });

    return addApolloState(apolloClient, {
      props: {},
      revalidate: 1,
    });
  } catch {
    return {
      redirect: {
        destination: "/stocks",
        permanent: false,
      },
    };
  }
}

export default SymbolDetails;
