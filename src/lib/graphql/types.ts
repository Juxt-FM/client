export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: EmailAddress;
  phone?: Maybe<PhoneNumber>;
  profile: UserProfile;
  verified: Scalars["Boolean"];
  active: Scalars["Boolean"];
  suspended: Scalars["Boolean"];
  lastLogin: Scalars["String"];
  updatedAt: Scalars["String"];
  createdAt: Scalars["String"];
};

export type PhoneNumber = {
  __typename?: "PhoneNumber";
  number?: Maybe<Scalars["String"]>;
  verified?: Maybe<Scalars["Boolean"]>;
};

export type EmailAddress = {
  __typename?: "EmailAddress";
  address: Scalars["String"];
  verified: Scalars["Boolean"];
};

export type UserProfile = {
  __typename?: "UserProfile";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  imageURL?: Maybe<Scalars["String"]>;
  platforms: UserPlatforms;
  watchlists: Watchlist[];
  posts: BlogPost[];
  comments: Comment[];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type UserPlatforms = {
  __typename?: "UserPlatforms";
  twitter?: Maybe<Scalars["String"]>;
};

export type AuthCredentials = {
  __typename?: "AuthCredentials";
  accessToken: Scalars["String"];
};

export type CreateUserInput = {
  name?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  phoneNumber?: Maybe<Scalars["String"]>;
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
};

export type LoginUserInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type PasswordResetInput = {
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
};

export type ApcaCredentialsInput = {
  keyId: Scalars["String"];
  secretKey: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  me: User;
  userProfile: UserProfile;
  alpacaAccount: AlpacaAccount;
  activity: Activity[];
  orders: Order[];
  order: Order;
  positions: Position[];
  position: Position;
  companyProfile: CompanyProfile;
  searchTickers: Stock[];
  latestNews: StockNews[];
  intradayRecords: IntradayRecord[];
  singleBlogPost: BlogPost;
  filterBlogPosts: BlogPost[];
  reactions: Reaction[];
  myDrafts: BlogPost[];
  commentThread: Comment[];
};

export type QueryUserProfileArgs = {
  id: Scalars["ID"];
};

export type QueryActivityArgs = {
  activityTypes?: Maybe<Scalars["String"][]>;
  filters?: Maybe<ActivityFilters>;
};

export type QueryOrdersArgs = {
  filters?: Maybe<OrderFiltersInput>;
};

export type QueryOrderArgs = {
  id?: Maybe<Scalars["ID"]>;
  clientId?: Maybe<Scalars["ID"]>;
};

export type QueryPositionArgs = {
  symbol?: Maybe<Scalars["String"]>;
};

export type QueryCompanyProfileArgs = {
  symbol: Scalars["String"];
};

export type QuerySearchTickersArgs = {
  filters: SearchFilters;
};

export type QueryIntradayRecordsArgs = {
  symbol: Scalars["String"];
  timeframe?: Maybe<Scalars["String"]>;
};

export type QuerySingleBlogPostArgs = {
  id: Scalars["ID"];
};

export type QueryFilterBlogPostsArgs = {
  filters: BlogPostFilters;
};

export type QueryReactionsArgs = {
  id: Scalars["ID"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type QueryMyDraftsArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCommentThreadArgs = {
  parent: Scalars["ID"];
  filters: CommentThreadFilters;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: AuthCredentials;
  loginUser: AuthCredentials;
  logoutUser: Scalars["String"];
  verifyEmail?: Maybe<AuthCredentials>;
  verifyPhone?: Maybe<AuthCredentials>;
  verifyOTP: AuthCredentials;
  forgotPassword: Scalars["String"];
  resetPassword: Scalars["String"];
  refreshToken: AuthCredentials;
  deactivateAccount: Scalars["String"];
  updateUser: User;
  setAPCACredentials: Scalars["String"];
  createOrder: Order;
  replaceOrder: Order;
  cancelOrder: Scalars["String"];
  cancelAllOrders: Scalars["String"];
  closeAllPositions: Scalars["String"];
  closePosition: Order;
  createBlogPost: BlogPost;
  updateBlogPost: BlogPost;
  deleteBlogPost: Scalars["String"];
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
  createReaction: Reaction;
  updateReaction: Reaction;
  deleteReaction: Scalars["String"];
  createWatchlist: Watchlist;
  updateWatchlist: Watchlist;
  deleteWatchlist: Scalars["String"];
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationLoginUserArgs = {
  data: LoginUserInput;
};

export type MutationVerifyEmailArgs = {
  code: Scalars["String"];
};

export type MutationVerifyPhoneArgs = {
  code: Scalars["String"];
};

export type MutationVerifyOtpArgs = {
  code: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  data: PasswordResetInput;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationSetApcaCredentialsArgs = {
  data: ApcaCredentialsInput;
};

export type MutationCreateOrderArgs = {
  data: OrderInput;
};

export type MutationReplaceOrderArgs = {
  id: Scalars["ID"];
  data: OrderReplacementInput;
};

export type MutationCancelOrderArgs = {
  id: Scalars["ID"];
};

export type MutationClosePositionArgs = {
  symbol: Scalars["String"];
};

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput;
};

export type MutationUpdateBlogPostArgs = {
  id: Scalars["ID"];
  data: BlogPostUpdates;
};

export type MutationDeleteBlogPostArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCommentArgs = {
  data: CommentInput;
};

export type MutationUpdateCommentArgs = {
  id: Scalars["ID"];
  data: CommentInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars["ID"];
};

export type MutationCreateReactionArgs = {
  data: ReactionInput;
};

export type MutationUpdateReactionArgs = {
  id: Scalars["ID"];
  data: ReactionInput;
};

export type MutationDeleteReactionArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWatchlistArgs = {
  data: WatchlistInput;
};

export type MutationUpdateWatchlistArgs = {
  id: Scalars["ID"];
  data: WatchlistInput;
};

export type MutationDeleteWatchlistArgs = {
  id: Scalars["ID"];
};

export type AlpacaAccount = {
  __typename?: "AlpacaAccount";
  id: Scalars["ID"];
  accountBlocked: Scalars["Boolean"];
  accountNumber: Scalars["String"];
  buyingPower: Scalars["String"];
  cash: Scalars["String"];
  currency: Scalars["String"];
  equity: Scalars["String"];
  initialMargin: Scalars["String"];
  lastEquity: Scalars["String"];
  lastMaintenanceMargin: Scalars["String"];
  longMarketValue: Scalars["String"];
  maintenanceMargin: Scalars["String"];
  multiplier: Scalars["String"];
  portfolioValue: Scalars["String"];
  regtBuyingPower: Scalars["String"];
  shortMarketValue: Scalars["String"];
  shortingEnabled: Scalars["String"];
  sma: Scalars["String"];
  status: Scalars["String"];
  patternDayTrader: Scalars["Boolean"];
  daytradeCount: Scalars["String"];
  daytradeBuyingPower?: Maybe<Scalars["String"]>;
  tradeSuspendedByUser: Scalars["Boolean"];
  tradingBlocked: Scalars["Boolean"];
  transfersBlocked: Scalars["Boolean"];
  createdAt: Scalars["String"];
};

export type TradeActivity = {
  __typename?: "TradeActivity";
  id: Scalars["ID"];
  orderId: Scalars["ID"];
  activityType: Scalars["String"];
  cumQty: Scalars["String"];
  leavesQty: Scalars["String"];
  price: Scalars["String"];
  qty?: Maybe<Scalars["String"]>;
  side: Scalars["String"];
  symbol?: Maybe<Scalars["String"]>;
  transactionTime: Scalars["String"];
  type: Scalars["String"];
};

export type NonTradeActivity = {
  __typename?: "NonTradeActivity";
  id: Scalars["ID"];
  activityType: Scalars["String"];
  date: Scalars["String"];
  netAmount: Scalars["String"];
  qty?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  perShareAmount?: Maybe<Scalars["String"]>;
};

export type Activity = TradeActivity | NonTradeActivity;

export type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  clientOrderId: Scalars["ID"];
  replacedBy?: Maybe<Scalars["ID"]>;
  replaces?: Maybe<Scalars["ID"]>;
  assetId: Scalars["ID"];
  symbol: Scalars["String"];
  assetClass: Scalars["String"];
  qty: Scalars["Int"];
  filledQty: Scalars["Int"];
  type: Scalars["String"];
  side: Scalars["String"];
  timeInForce: Scalars["String"];
  limitPrice?: Maybe<Scalars["String"]>;
  stopPrice?: Maybe<Scalars["String"]>;
  filledAvgPrice?: Maybe<Scalars["String"]>;
  status: Scalars["String"];
  extendedHours: Scalars["Boolean"];
  legs?: Maybe<Order[]>;
  trailPrice: Scalars["String"];
  trailPercent?: Maybe<Scalars["String"]>;
  hwm: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  submittedAt?: Maybe<Scalars["String"]>;
  filledAt?: Maybe<Scalars["String"]>;
  expiredAt?: Maybe<Scalars["String"]>;
  canceledAt?: Maybe<Scalars["String"]>;
  failedAt?: Maybe<Scalars["String"]>;
  replacedAt?: Maybe<Scalars["String"]>;
};

export type Position = {
  __typename?: "Position";
  assetId: Scalars["ID"];
  symbol: Scalars["String"];
  exchange: Scalars["String"];
  assetClass: Scalars["String"];
  avgEntryPrice: Scalars["String"];
  qty: Scalars["String"];
  side: Scalars["String"];
  marketValue: Scalars["String"];
  costBasis: Scalars["String"];
  unrealizedPl: Scalars["String"];
  unrealizedPlpc: Scalars["String"];
  unrealizedIntradayPl: Scalars["String"];
  unrealizedIntradayPlpc: Scalars["String"];
  currentPrice: Scalars["String"];
  lastdayPrice: Scalars["String"];
  changeToday: Scalars["String"];
};

export type OrderFiltersInput = {
  status?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  until?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  direction?: Maybe<Scalars["String"]>;
};

export type StopLossInput = {
  stopPrice: Scalars["String"];
  limitPrice: Scalars["String"];
};

export type OrderInput = {
  symbol: Scalars["String"];
  qty: Scalars["String"];
  side: Scalars["String"];
  type: Scalars["String"];
  timeInForce: Scalars["String"];
  limitPrice?: Maybe<Scalars["String"]>;
  stopPrice?: Maybe<Scalars["String"]>;
  trailPrice?: Maybe<Scalars["String"]>;
  extendedHours?: Maybe<Scalars["Boolean"]>;
  clientOrderId?: Maybe<Scalars["String"]>;
  orderClass?: Maybe<Scalars["String"]>;
  takeProfit?: Maybe<Scalars["String"]>;
  stopLoss?: Maybe<StopLossInput>;
};

export type OrderReplacementInput = {
  qty: Scalars["String"];
  timeInForce?: Maybe<Scalars["String"]>;
  limitPrice?: Maybe<Scalars["String"]>;
  stopPrice?: Maybe<Scalars["String"]>;
  trail?: Maybe<Scalars["String"]>;
  clientOrderId?: Maybe<Scalars["String"]>;
};

export type ActivityFilters = {
  date?: Maybe<Scalars["String"]>;
  until?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  direction?: Maybe<Scalars["String"]>;
  pageSize?: Maybe<Scalars["Int"]>;
  pageToken?: Maybe<Scalars["String"]>;
};

export type Quote = {
  __typename?: "Quote";
  price: Scalars["Float"];
  changesPercentage: Scalars["Float"];
  change: Scalars["Float"];
  dayLow: Scalars["Float"];
  dayHigh: Scalars["Float"];
  yearHigh: Scalars["Float"];
  yearLow: Scalars["Float"];
  marketCap: Scalars["Float"];
  priceAvg50: Scalars["Float"];
  priceAvg200: Scalars["Float"];
  volume: Scalars["Float"];
  avgVolume: Scalars["Float"];
  exchange: Scalars["String"];
  open: Scalars["Float"];
  previousClose: Scalars["Float"];
  eps: Scalars["Float"];
  pe: Scalars["Float"];
  earningsAnnouncement?: Maybe<Scalars["String"]>;
  sharesOutstanding?: Maybe<Scalars["Int"]>;
  timestamp: Scalars["Int"];
};

export type StockNews = {
  __typename?: "StockNews";
  symbol: Scalars["String"];
  publishedDate: Scalars["String"];
  title: Scalars["String"];
  image: Scalars["String"];
  site: Scalars["String"];
  text: Scalars["String"];
  url: Scalars["String"];
};

export type Stock = {
  __typename?: "Stock";
  symbol: Scalars["String"];
  name: Scalars["String"];
  currency?: Maybe<Scalars["String"]>;
  stockExchange?: Maybe<Scalars["String"]>;
  exchangeShortName?: Maybe<Scalars["String"]>;
  news: StockNews[];
  quote: Quote;
};

export type CompanyProfile = {
  __typename?: "CompanyProfile";
  symbol: Scalars["String"];
  beta?: Maybe<Scalars["Float"]>;
  volAvg?: Maybe<Scalars["String"]>;
  mktCap?: Maybe<Scalars["String"]>;
  lastDiv?: Maybe<Scalars["Float"]>;
  range?: Maybe<Scalars["String"]>;
  changes?: Maybe<Scalars["Float"]>;
  companyName?: Maybe<Scalars["String"]>;
  currency?: Maybe<Scalars["String"]>;
  isin?: Maybe<Scalars["String"]>;
  cusip?: Maybe<Scalars["String"]>;
  exchange?: Maybe<Scalars["String"]>;
  exchangeShortName?: Maybe<Scalars["String"]>;
  industry?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  ceo?: Maybe<Scalars["String"]>;
  sector?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  fullTimeEmployees?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
  dcfDiff?: Maybe<Scalars["Float"]>;
  dcf?: Maybe<Scalars["Float"]>;
  image?: Maybe<Scalars["String"]>;
  ipoDate?: Maybe<Scalars["String"]>;
  news: StockNews[];
  quote: Quote;
};

export type IntradayRecord = {
  __typename?: "IntradayRecord";
  open: Scalars["Float"];
  low: Scalars["Float"];
  high: Scalars["Float"];
  close: Scalars["Float"];
  volume: Scalars["Int"];
  date: Scalars["String"];
  timestamp: Scalars["String"];
};

export type SearchFilters = {
  query: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
};

export enum PublicationStatus {
  Public = "public",
  Draft = "draft",
}

export enum PostContentFormat {
  Html = "html",
  Markdown = "markdown",
}

export type BlogPost = {
  __typename?: "BlogPost";
  id: Scalars["ID"];
  publicationStatus: PublicationStatus;
  contentFormat: PostContentFormat;
  author: Scalars["ID"];
  title: Scalars["String"];
  subtitle?: Maybe<Scalars["String"]>;
  imageURL?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  symbols: Scalars["String"][];
  tags: Scalars["String"][];
  comments: Comment[];
  reactionCount: Scalars["Int"];
  reactionStatus?: Maybe<Reaction>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type BlogPostCommentsArgs = {
  depth: Scalars["Int"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  post: Scalars["ID"];
  replyStatus: Scalars["ID"];
  author: Scalars["ID"];
  message: Scalars["String"];
  replies?: Maybe<Comment[]>;
  reactionCount: Scalars["Int"];
  reactionStatus?: Maybe<Reaction>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Reaction = {
  __typename?: "Reaction";
  id: Scalars["ID"];
  to: Scalars["ID"];
  reaction: Scalars["String"];
  updatedAt: Scalars["String"];
  createdAt: Scalars["String"];
};

export type BlogPostInput = {
  publicationStatus?: Maybe<PublicationStatus>;
  contentFormat?: Maybe<PostContentFormat>;
  symbols: Scalars["String"][];
  tags: Scalars["String"][];
  title: Scalars["String"];
  imageURL?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
};

export type BlogPostUpdates = {
  publicationStatus?: Maybe<PublicationStatus>;
  contentFormat?: Maybe<PostContentFormat>;
  symbols?: Maybe<Scalars["String"][]>;
  tags?: Maybe<Scalars["String"][]>;
  title?: Maybe<Scalars["String"]>;
  imageURL?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type CommentInput = {
  post: Scalars["ID"];
  replyStatus?: Maybe<Scalars["ID"]>;
  message: Scalars["String"];
};

export type ReactionInput = {
  to: Scalars["String"];
  toType: Scalars["String"];
  reaction: Scalars["String"];
};

export type BlogPostFilters = {
  user?: Maybe<Scalars["ID"]>;
  query?: Maybe<Scalars["String"]>;
  symbols?: Maybe<Scalars["String"][]>;
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type CommentThreadFilters = {
  depth: Scalars["Int"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type Watchlist = {
  __typename?: "Watchlist";
  id: Scalars["ID"];
  name: Scalars["String"];
  symbols: Scalars["String"][];
  updatedAt: Scalars["String"];
  createdAt: Scalars["String"];
};

export type WatchlistInput = {
  name?: Maybe<Scalars["String"]>;
  symbols?: Maybe<Scalars["String"][]>;
};
