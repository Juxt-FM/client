/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import gql from "graphql-tag";

export const QUERY_AUTH_USER = gql`
  query {
    me {
      id
      email {
        address
        verified
      }
      phone {
        number
        verified
      }
      profile {
        id
        name
        location
        summary
        imageURL
        watchlists {
          id
          name
          symbols
          createdAt
          updatedAt
        }
      }
      verified
      active
      suspended
      lastLogin
      updatedAt
      createdAt
    }
  }
`;

export const QUERY_USER_PROFILE = gql`
  query UserProfile($id: ID!) {
    userProfile(id: $id) {
      id
      name
      location
      summary
      createdAt
      updatedAt
      imageURL
    }
  }
`;

export const QUERY_FILTER_POSTS = gql`
  query Filter($filters: BlogPostFilters!) {
    filterBlogPosts(filters: $filters) {
      id
      title
      subtitle
      imageURL
      tags
      symbols
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_BLOG_POST = gql`
  query BlogPost($id: ID!) {
    singleBlogPost(id: $id) {
      id
      publicationStatus
      contentFormat
      author
      title
      subtitle
      imageURL
      content
      symbols
      tags
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_INTRADAY_REOCRDS = gql`
  query Intraday($symbol: String!, $timeframe: String) {
    intradayRecords(symbol: $symbol, timeframe: $timeframe) {
      open
      close
      high
      low
      volume
      timestamp
    }
  }
`;

export const QUERY_TICKER = gql`
  query CompanyProfile($symbol: String!) {
    companyProfile(symbol: $symbol) {
      symbol
      beta
      volAvg
      mktCap
      lastDiv
      range
      changes
      companyName
      currency
      isin
      cusip
      exchange
      exchangeShortName
      industry
      website
      description
      ceo
      sector
      country
      fullTimeEmployees
      phone
      address
      city
      state
      zip
      dcfDiff
      dcf
      image
      ipoDate
      news {
        symbol
        publishedDate
        title
        image
        site
        text
        url
      }
      quote {
        price
        changesPercentage
        change
        dayLow
        dayHigh
        yearHigh
        yearLow
        marketCap
        priceAvg50
        priceAvg200
        volume
        avgVolume
        exchange
        open
        previousClose
        eps
        pe
        earningsAnnouncement
        sharesOutstanding
        timestamp
      }
    }
  }
`;
