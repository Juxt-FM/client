export const MockUser = {
  id: "1",
  email: {
    address: "email@email.com",
    verified: true,
  },
  phone: {
    number: "+11234567890",
    verified: true,
  },
  profile: {
    id: "1",
    name: "Test User",
    location: null,
    summary: null,
    imageURL: null,
    watchlists: [],
  },
  verified: true,
  active: true,
  suspended: false,
  lastLogin: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
};
