/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import gql from "graphql-tag";

export const MUTATION_LOGIN = gql`
  mutation Login($data: LoginUserInput!) {
    loginUser(data: $data) {
      accessToken
    }
  }
`;

export const MUTATION_SIGNUP = gql`
  mutation Signup($data: CreateUserInput!) {
    createUser(data: $data) {
      accessToken
    }
  }
`;

export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      email {
        address
        verified
      }
      phone {
        number
        verified
      }
      profile {
        name
        location
        summary
        imageURL
      }
    }
  }
`;

export const MUTATION_REFRESH_TOKEN = gql`
  mutation {
    refreshToken {
      accessToken
    }
  }
`;

export const MUTATION_CREATE_WATCHLIST = gql`
  mutation CreateWatchlist($data: WatchlistInput!) {
    createWatchlist(data: $data) {
      id
      name
      symbols
      createdAt
      updatedAt
    }
  }
`;

export const MUTATION_UPDATE_WATCHLIST = gql`
  mutation UpdateWatchlist($data: WatchlistInput!) {
    updateWatchlist(data: $data) {
      id
      name
      symbols
      createdAt
      updatedAt
    }
  }
`;

export const MUTATION_DELETE_WATCHLIST = gql`
  mutation DeleteWatchlist($id: ID!) {
    deleteWatchlist(id: $id)
  }
`;

export const MUTATION_LOGOUT = gql`
  mutation {
    logoutUser
  }
`;

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost($data: BlogPostInput!) {
    createBlogPost(data: $data) {
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

export const MUTATION_UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $data: BlogPostInput!) {
    updateBlogPost(id: $id, data: $data) {
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
