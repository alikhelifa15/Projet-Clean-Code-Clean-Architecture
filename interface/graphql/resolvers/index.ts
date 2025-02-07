import { userResolvers } from './userResolvers';
import { motorcycleResolvers } from './motorcycleResolvers';
import { clientResolvers } from './clientResolvers';
import { driverResolvers } from './driverResolver';
import { partResolvers } from './partResolver';

export const resolvers = {
  Query: {
    ...userResolvers,
    ...motorcycleResolvers,
    ...clientResolvers,
    ...driverResolvers,
    ...partResolvers
  }
};