import { CompanyRepository as ICompanyRepository } from "../../../application/repositories/CompanyRepository";
import { Company } from "../../../domain/entities/Company";
import CompanyModel from "../../database/mysql/models/Company"; 

export class CompanyRepository implements ICompanyRepository {  
    async save(company: Company): Promise<Company> {
        const companyModel = await CompanyModel.create({ 
            id: company.id,
            user_id: company.userId,        
            company_name: company.companyName,
            siret_number: company.siretNumber,
            address: company.address,
            postal_code: company.postalCode,            
            city: company.city,
            phone: company.phone,
        } as any);
        return new Company(
            companyModel.id,
            companyModel.user_id,        
            companyModel.company_name,
            companyModel.siret_number,
            companyModel.address,
            companyModel.postal_code,            
            companyModel.city,
            companyModel.phone
        );
    }
async update(company: Company): Promise<Company> {
    const companyModel = await CompanyModel.findByPk(company.id);
    if (!companyModel) {
        throw new Error(`Company with id ${company.id} not found`);
    }
    const updateData = {
        user_id: company.userId,        
        company_name: company.companyName,
        siret_number: company.siretNumber,
        address: company.address,
        postal_code: company.postalCode,            
        city: company.city,
        phone: company.phone,
    };
    await companyModel.update(updateData);
    return company;
}
async delete(id: string): Promise<void> {
    const companyModel = await CompanyModel.findByPk(id);
    if (!companyModel) {
        throw new Error(`Company with id ${id} not found`);
    }
    await companyModel.destroy();
}

async findAll(): Promise<Company[]> {
    const companyModels = await CompanyModel.findAll();
    return companyModels.map((companyModel) => {
        return new Company(
            companyModel.id,
            companyModel.user_id,        
            companyModel.company_name,
            companyModel.siret_number,
            companyModel.address,
            companyModel.postal_code,            
            companyModel.city,
            companyModel.phone
        );
    });
}

async findById(id: string): Promise<Company | null> {        
    const companyModel = await CompanyModel.findByPk(id);
    if (!companyModel) {
        return null;
    }
    return new Company(
        companyModel.id,
        companyModel.user_id,        
        companyModel.company_name,
        companyModel.siret_number,
        companyModel.address,
        companyModel.postal_code,            
        companyModel.city,
        companyModel.phone
    );  
}
async findByUserId(userId: number): Promise<Company | null> {        
    const companyModel = await CompanyModel.findOne({ where: { user_id: userId } });
    if (!companyModel) {
        return null;
    }
    return new Company(
        companyModel.id,
        companyModel.user_id,        
        companyModel.company_name,
        companyModel.siret_number,
        companyModel.address,
        companyModel.postal_code,            
        companyModel.city,
        companyModel.phone
    );  
}
}