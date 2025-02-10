import { PhoneNumber } from '../value-objects/PhoneNumber';
import { PostalAddress } from '../value-objects/PostalAddress';
import { SiretNumber } from '../value-objects/SiretNumber';

export class Company {
  private readonly address: PostalAddress | null;
  private readonly phone: PhoneNumber | null;
  private readonly siretNumber: SiretNumber;

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly companyName: string,
    siretNumber: string,
    phone: string | null,
    address: string | null,
    postalCode: string | null,
    city: string | null
  ) {
    if (!companyName.trim()) {
      throw new Error('Company name is required.');
    }

    this.siretNumber = new SiretNumber(siretNumber);
    this.phone = phone ? new PhoneNumber(phone) : null;
    this.address = address && postalCode && city ? new PostalAddress(address, postalCode, city) : null;
  }

  getSiretNumber(): string {
    return this.siretNumber.toString();
  }

  getPhone(): string | null {
    return this.phone?.toString() || null;
  }

  getAddress(): string | null {
    return this.address?.toString() || null;
  }

  getPostalCode(): string | null {
    return this.address?.getPostalCode() || null;
  }

  getCity(): string | null {
    return this.address?.getCity() || null;
  }
}