import { GetAllUsersWithDetailsQuery } from "../../../application/usecases/queries/User-queries/GetAllUsersWithDetailsQuery";
import { GetUserWithDetailsQuery } from "../../../application/usecases/queries/User-queries/GetUserWithDetailsQuery";
import { GetAllUsersWithDetailsQueryHandler } from "../../../application/usecases/query-handlers/User-query-handler/GetAllUsersWithDetailsQueryHandler";
import { GetUserWithDetailsQueryHandler } from "../../../application/usecases/query-handlers/User-query-handler/GetUserWithDetailsQueryHandler";
export const userResolvers = {
  user: async (_: unknown, { id, email }: { id?: string; email?: string }) => {
    const handler = new GetUserWithDetailsQueryHandler();
    const query = new GetUserWithDetailsQuery(id ? parseInt(id, 10) : undefined, email);
    const result = await handler.execute(query);
    if (!result) return null;

    return {
      id: result.user.id,
      email: result.user.getEmail(),
      type: result.user.getType(),
      creationDate: result.user.creationDate.toISOString(),
      company: result.company ? {
        id: result.company.id,
        userId: result.company.userId,
        companyName: result.company.companyName,
        siretNumber: result.company.getSiretNumber(),
        phone: result.company.getPhone(),
        address: result.company.getAddress(),
        postalCode: result.company.getPostalCode(),
        city: result.company.getCity()
      } : null,
      dealer: result.dealer ? {
        id: result.dealer.id,
        userId: result.dealer.userId,
        name: result.dealer.name,
        phone: result.dealer.getPhone(),
        address: result.dealer.getAddress(),
        postalCode: result.dealer.getPostalCode(),
        city: result.dealer.getCity(),
        services: result.dealer.services
      } : null
    };
  },
  users: async () => {
    const handler = new GetAllUsersWithDetailsQueryHandler();
    const query = new GetAllUsersWithDetailsQuery();
    const results = await handler.execute(query);

    return results.map(result => ({
      id: result.user.id,
      email: result.user.getEmail(),
      type: result.user.getType(),
      creationDate: result.user.creationDate.toISOString(),
      company: result.company ? {
        id: result.company.id,
        userId: result.company.userId,
        companyName: result.company.companyName,
        siretNumber: result.company.getSiretNumber(),
        phone: result.company.getPhone(),
        address: result.company.getAddress(),
        postalCode: result.company.getPostalCode(),
        city: result.company.getCity()
      } : null,
      dealer: result.dealer ? {
        id: result.dealer.id,
        userId: result.dealer.userId,
        name: result.dealer.name,
        phone: result.dealer.getPhone(),
        address: result.dealer.getAddress(),
        postalCode: result.dealer.getPostalCode(),
        city: result.dealer.getCity(),
        services: result.dealer.services
      } : null
    }));
  }
};