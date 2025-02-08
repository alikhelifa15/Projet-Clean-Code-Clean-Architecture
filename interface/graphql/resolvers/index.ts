import { userResolvers } from './userResolvers';
import { motorcycleResolvers } from './motorcycleResolvers';
import { clientResolvers } from './clientResolvers';
import { driverResolvers } from './driverResolver';
import { partResolvers } from './partResolver';
import { incidentResolvers } from './incidentResolvers';
import { testResolvers } from './testResolvers';

export const resolvers = {
  Query: {
    ...userResolvers,
    ...motorcycleResolvers,
    ...clientResolvers,
    ...driverResolvers,

    ...partResolvers

    ... incidentResolvers,
    ... testResolvers

  }
};