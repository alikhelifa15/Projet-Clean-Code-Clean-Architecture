import { Company } from '../../../domain/entities/Company';
import { Dealer } from '../../../domain/entities/Dealer';
import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { UserType } from '../../../domain/value-objects/UserType';
import { connectDB } from '../../../infrastructure/database/mongodb/models';
import CompanyMongo from '../../../infrastructure/database/mongodb/models/company';
import DealerMongo from '../../../infrastructure/database/mongodb/models/dealer';
import UserMongo from '../../../infrastructure/database/mongodb/models/user';
import { GetAllUsersWithDetailsQuery } from '../queries/GetAllUsersWithDetailsQuery';
import { ICompany } from '../../../infrastructure/database/mongodb/models/company';

export interface UserWithDetails {
    user: User;
    company?: Company;
    dealer?: Dealer;
  }
  
  
  export class GetAllUsersWithDetailsQueryHandler {
    async execute(_query: GetAllUsersWithDetailsQuery): Promise<UserWithDetails[]> {
      try {
        await connectDB();
        
        const userDocs = await UserMongo.find();
        const usersWithDetails: UserWithDetails[] = [];
  
        for (const userDoc of userDocs) {
          try {
            const user = new User(
              (userDoc as any).id.toString(),
              new Email((userDoc as any).email),
              new Password((userDoc as any).password),
              new UserType((userDoc as any).type),
              (userDoc as any).creationDate
            );
  
            let company: Company | undefined;
            let dealer: Dealer | undefined;
  
            if (user.getType() === 'COMPANY') {
              const companyDoc = await CompanyMongo.findOne({ 
                user_id: userDoc.id
              }) as { _id: string } & ICompany | null;
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
                user_id: userDoc.id 
              });
              if (dealerDoc) {
                dealer = new Dealer(
                  dealerDoc._id!.toString(),
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
  
            usersWithDetails.push({ user, company, dealer });
          } catch (error) {
            console.error(`Error processing user ${userDoc._id}:`, error);
            continue;
          }
        }
  
        return usersWithDetails;
      } catch (error) {
        console.error('Error executing GetAllUsersWithDetailsQuery:', error);
        throw new Error('Failed to fetch users with details');
      }
    }
  }