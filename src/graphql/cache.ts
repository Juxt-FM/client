/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    UserProfile: {
      fields: {
        watchlists: {
          merge: (existing, incoming) => incoming,
        },
      },
    },
    CompanyProfile: {
      fields: {
        news: {
          merge: (existing, incoming) => incoming,
        },
      },
    },
  },
});
