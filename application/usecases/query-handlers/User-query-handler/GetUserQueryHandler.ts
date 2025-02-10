import { GetUserQuery } from '../../queries/User-queries/GetUserQuery';
import { User } from '../../../../domain/entities/User';
import UserMongo from '../../../../infrastructure/database/mongodb/models/user';
import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import { Email } from '../../../../domain/value-objects/Email';
import { Password } from '../../../../domain/value-objects/Password';
import { UserType } from '../../../../domain/value-objects/UserType';

export class GetUserQueryHandler {
  async execute(query: GetUserQuery): Promise<User | null> {
    await connectDB();
    const criteria: any = {};
    if (query.id) criteria._id = query.id;
    if (query.email) criteria.email = new Email(query.email).toString();

    const userDoc = await UserMongo.findOne(criteria);
    
    if (!userDoc) return null;

    return new User(
      userDoc._id as number,
      new Email(userDoc.email),
      new Password(userDoc.password),
      new UserType(userDoc.type),
      userDoc.creationDate
    );
  }
}