import { PartnerCompany } from './models/PartnerCompany';
import { Motorcycle } from './models/Motorcycle';
import { PartOrder } from './models/PartOrder';
import { Part } from './models/Part';
import User from './models/User';
import Driver from './models/Driver';

export const seedDatabase = async () => {
  console.log('Starting database seeding...');

  // 1. Seed PartnerCompany without ParentCompany
  const partnerCompanies = await PartnerCompany.bulkCreate([
    {
      name: 'Company A',
      address: '123 Main Street',
      phone: '1234567890',
      email: 'contact@companya.com',
      type: 'delivery',
      status: 'active',
      siret: '12345678901234',
    },
    {
      name: 'Company B',
      address: '456 Elm Street',
      phone: '0987654321',
      email: 'info@companyb.com',
      type: 'courier',
      status: 'inactive',
      siret: '98765432109876',
    },
  ]);

  console.log('PartnerCompany data seeded.');

  // 2. Get the generated IDs for PartnerCompany and seed related tables

  const companyA = partnerCompanies[0];
  const companyB = partnerCompanies[1];

  // 3. Seed Motorcycles (referencing PartnerCompany IDs)
  await Motorcycle.bulkCreate([
    { serialNumber: '1234567898765',model: 'Motorcycle A', licensePlate: 'ABC123',mileage:'5400', CompanyId: 1 },
    { serialNumber: '1234567890765',model: 'Motorcycle B', licensePlate: 'XYZ987',mileage:'2700', CompanyId: 2 },
  ]);

  console.log('Motorcycle data seeded.');

  // 4. Seed Parts (you need to have parts before you create part orders)
  const parts = await Part.bulkCreate([
    { name: 'Part A',  unitPrice: 100 , CompanyId: 1},
    { name: 'Part B', unitPrice: 200 , CompanyId: 1},
  ]);

  console.log('Part data seeded.');

  // 5. Seed PartOrders (referencing Part and PartnerCompany)
  await PartOrder.bulkCreate([
    { partnerCompanyId: companyA.id, partId: parts[0].id, orderDate: new Date() },
    { partnerCompanyId: companyB.id, partId: parts[1].id, orderDate: new Date() },
  ]);


  // 6. Seed users
  await User.bulkCreate([
    { firstName: 'John', lastName: 'Doe', email: 'test@gmail.com', password: '123456Wazerty', role: 'super_admin', status: 'active', companyId: 1 },
    { firstName: 'Mari', lastName: 'Loe', email: 'marie@gmail.com', password: '123456Wazerty', role: 'admin', status: 'active', companyId: 2 },
  ]);
  

  

  // 7. Seed users
  await Driver.bulkCreate([
    { firstName: 'John', lastName: 'Doe', licenseNumber: '123456', licenseDate: new Date(), experience: 5, status: 'active', companyId: 1 },
    { firstName: 'Mari', lastName: 'Loe', licenseNumber: '654321', licenseDate: new Date(), experience: 2, status: 'active', companyId: 2 },
  ]);
  
  console.log('Database seeding complete!');
};
