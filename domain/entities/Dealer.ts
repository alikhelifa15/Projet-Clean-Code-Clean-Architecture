import { PhoneNumber } from '../value-objects/PhoneNumber';
import { PostalAddress } from '../value-objects/PostalAddress';

export class Dealer {
  private readonly address: PostalAddress | null;
  private readonly phone: PhoneNumber | null;

  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public readonly name: string,
    phone: string | null,
    address: string | null,
    postalCode: string | null,
    city: string | null,
    public readonly services: string | null,
  ) {
    if (!name.trim()) {
      throw new Error('Dealer name is required.');
    }

    this.phone = phone ? new PhoneNumber(phone) : null;
    this.address = address && postalCode && city
      ? new PostalAddress(address, postalCode, city)
      : null;
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