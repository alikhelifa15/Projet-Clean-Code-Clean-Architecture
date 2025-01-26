import { GetAllUsersQuery } from '../queries/GetAllUsersQuery';
import { User } from '../../../domain/entities/User';
import UserMongo from '../../../infrastructure/database/mongodb/models/user';
import { connectDB } from '../../../infrastructure/database/mongodb/models';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { UserType } from '../../../domain/value-objects/UserType';

export class GetAllUsersQueryHandler {
  async execute(_query: GetAllUsersQuery): Promise<User[]> {
    await connectDB();
    const userDocs = await UserMongo.find();
    
    return userDocs.map(doc => new User(
      doc._id as number,
      new Email(doc.email),
      new Password(doc.password), 
      new UserType(doc.type),
      doc.creationDate
    ));
  }
}