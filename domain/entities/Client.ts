import { PersonName } from '../value-objects/PersonName';
import { PhoneNumber } from '../value-objects/PhoneNumber';

export class Client {
  private readonly name: PersonName;
  private readonly phone: PhoneNumber | null;

  constructor(
    public readonly id: number,
    public readonly dealerId: number | null,
    firstName: string,
    lastName: string,
    phone: string | null
  ) {
    this.name = new PersonName(firstName, lastName);
    this.phone = phone ? new PhoneNumber(phone) : null;
  }

  getFirstName(): string {
    return this.name.getFirstName();
  }

  getLastName(): string {
    return this.name.getLastName();
  }

  getFullName(): string {
    return this.name.getFullName();
  }

  getPhone(): string | null {
    return this.phone?.toString() || null;
  }
}