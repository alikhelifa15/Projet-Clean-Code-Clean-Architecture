import { userResolvers } from './userResolvers';
import { motorcycleResolvers } from './motorcycleResolvers';

export const resolvers = {
  Query: {
    ...userResolvers,
    ...motorcycleResolvers
  }
};