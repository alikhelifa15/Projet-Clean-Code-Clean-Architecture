import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserType } from '../value-objects/UserType';

export class User {
  constructor(
    public readonly id: number | null|string,
    private readonly email: Email,
    private readonly password: Password,
    private readonly type: UserType,
    public readonly creationDate: Date = new Date()
  ) {}

  getEmail(): string {
    return this.email.toString();
  }

  getPassword(): string {
    return this.password.toString();
  }

  getType(): string {
    return this.type.toString();
  }
}