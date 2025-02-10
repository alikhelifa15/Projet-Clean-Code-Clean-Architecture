import { CompanyRepository as ICompanyRepository } from '../../../application/repositories/CompanyRepository';
import { Company } from '../../../domain/entities/Company';
import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';
import { PostalAddress } from '../../../domain/value-objects/PostalAddress';
import { SiretNumber } from '../../../domain/value-objects/SiretNumber';
import CompanyModel from '../../database/mysql/models/Company';

export class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<Company> {
    const companyModel = await CompanyModel.create({
      id: company.id,
      user_id: company.userId,
      company_name: company.companyName,
      siret_number: company.getSiretNumber(),
      phone: company.getPhone(),
      address: company.getAddress(),
      postal_code: company.getPostalCode(),
      city: company.getCity(),
    } as any);

    return this.toDomainEntity(companyModel);
  }

  async findById(id: string): Promise<Company | null> {
    const companyModel = await CompanyModel.findByPk(id);
    if (!companyModel) return null;
    return this.toDomainEntity(companyModel);
  }

  async findByUserId(userId: number): Promise<Company | null> {
    const companyModel = await CompanyModel.findOne({
      where: { user_id: userId },
    });
    if (!companyModel) return null;
    return this.toDomainEntity(companyModel);
  }

  async findAll(): Promise<Company[]> {
    const companyModels = await CompanyModel.findAll();
    return companyModels.map(model => this.toDomainEntity(model));
  }

  async update(company: Company): Promise<Company> {
    const instance = await CompanyModel.findOne({ where: { user_id: company.userId } });
    if (!instance) throw new Error('Company not found.');
  
    await instance.update({
      company_name: company.companyName,
      siret_number: company.getSiretNumber(),
      phone: company.getPhone(),
      address: company.getAddress(),
      postal_code: company.getPostalCode(),
      city: company.getCity()
    });
  
    return this.toDomainEntity(instance);
  }
  async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error('Company ID is required to delete a company.');
    }
    const instance = await CompanyModel.findOne({ where: { user_id: id } });
    if (!instance) {
      throw new Error('Company not found.');
    }
    await instance.destroy();
  }

  private toDomainEntity(model: any): Company {
    const phone = model.phone ? new PhoneNumber(model.phone) : null;
    const address = model.address && model.postal_code && model.city
      ? new PostalAddress(model.address, model.postal_code, model.city)
      : null;
    const siretNumber = new SiretNumber(model.siret_number);

    return new Company(
      model.id,
      model.user_id,
      model.company_name,
      siretNumber.toString(),
      phone?.toString() || null,
      address?.getAddress() || null,
      address?.getPostalCode() || null,
      address?.getCity() || null
    );
  }
}