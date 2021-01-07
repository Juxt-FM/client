import faker from "faker";

export const getMockUser = () => ({
  id: "1",
  email: {
    address: faker.internet.email(),
    verified: true,
  },
  phone: {
    number: faker.phone.phoneNumber(),
    verified: true,
  },
  profile: {
    id: "1",
    name: faker.name.findName(),
    location: faker.address.city + ", " + faker.address.stateAbbr(),
    summary: faker.company.catchPhrase(),
    imageURL: faker.image.imageUrl(),
    watchlists: [],
  },
  verified: true,
  active: true,
  suspended: false,
  lastLogin: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const getMockPost = () => ({
  id: "1",
  publicationStatus: "public",
  contentFormat: "markdown",
  author: "1",
  title: "Is the market catching up with the economy?",
  subtitle:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur inventore rem quaerat facere sit, est nulla sed illum molestias dicta ipsa corporis ipsam porro dolore eaque architecto velit voluptates quam.",
  imageURL: faker.image.imageUrl(),
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur inventore rem quaerat facere sit, est nulla sed illum molestias dicta ipsa corporis ipsam porro dolore eaque architecto velit voluptates quam.",
  symbols: ["NVDA", "QQQ"],
  tags: ["stock market"],
  comments: [],
  reactionCount: 0,
  reactionStatus: null,
  createdAt: "1609986720",
  updatedAt: "1609986720",
});
