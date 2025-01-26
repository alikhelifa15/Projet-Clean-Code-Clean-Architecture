import { GetUserWithDetailsQuery } from '../queries/GetUserWithDetailsQuery';
import { User } from '../../../domain/entities/User';
import { Company } from '../../../domain/entities/Company';
import { Dealer } from '../../../domain/entities/Dealer';
import UserMongo from '../../../infrastructure/database/mongodb/models/user';
import CompanyMongo from '../../../infrastructure/database/mongodb/models/company';
import DealerMongo from '../../../infrastructure/database/mongodb/models/dealer';
import { connectDB } from '../../../infrastructure/database/mongodb/models';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { UserType } from '../../../domain/value-objects/UserType';
import { Types } from 'mongoose';
import { ICompany } from '../../../infrastructure/database/mongodb/models/company';
import { IDealer } from '../../../infrastructure/database/mongodb/models/dealer';
import { IUser } from '../../../infrastructure/database/mongodb/models/user';

interface UserWithDetails {
  user: User;
  company?: Company;
  dealer?: Dealer;
}

export class GetUserWithDetailsQueryHandler {
  async execute(query: GetUserWithDetailsQuery): Promise<UserWithDetails | null> {
    try {
      await connectDB();
      
      const criteria: any = {};
      if (query.id) criteria._id = new Types.ObjectId(query.id);
      if (query.email) criteria.email = new Email(query.email).toString();

      const userDoc = await UserMongo.findOne(criteria).exec() as IUser & { _id: Types.ObjectId } | null;
      if (!userDoc) return null;

      const user = new User(
        userDoc!._id.toString(),
        new Email(userDoc!.email),
        new Password(userDoc!.password),
        new UserType(userDoc!.type),
        userDoc!.creationDate
      );

      let company: Company | undefined;
      let dealer: Dealer | undefined;

      if (user.getType() === 'COMPANY') {
        const companyDoc = await CompanyMongo.findOne({ 
          user_id: userDoc._id 
        }).exec() as ICompany & { _id: Types.ObjectId } | null;
        
        if (companyDoc) {
          company = new Company(
            companyDoc._id.toString(),
            companyDoc.user_id.toString(),
            companyDoc.company_name,
            companyDoc.siret_number,
            companyDoc.phone,
            companyDoc.address,
            companyDoc.postal_code,
            companyDoc.city
          );
        }
      } else if (user.getType() === 'DEALER') {
        const dealerDoc = await DealerMongo.findOne({ 
          user_id: userDoc._id
        }).exec() as IDealer & { _id: Types.ObjectId } | null;
        
        if (dealerDoc) {
          dealer = new Dealer(
            dealerDoc._id.toString(),
            dealerDoc.user_id.toString(),
            dealerDoc.name,
            dealerDoc.phone,
            dealerDoc.address,
            dealerDoc.postal_code,
            dealerDoc.city,
            dealerDoc.services
          );
        }
      }

      return { user, company, dealer };
    } catch (error) {
      console.error('Error in GetUserWithDetailsQueryHandler:', error);
      throw new Error('Failed to fetch user details');
    }
  }
}