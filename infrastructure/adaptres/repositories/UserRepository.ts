import { UserRepository as IUserRepository } from "../../../application/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { UserType } from "../../../domain/value-objects/UserType";
import UserMongo from "../../database/mongodb/models/user";
import UserModel from "../../database/mysql/models/User";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const userModel = await UserModel.create({
      email: user.getEmail(),
      password: user.getPassword(),
      type: user.getType(),
      creationDate: user.creationDate,
    } as any);

    return new User(
      userModel.id,
      new Email(userModel.email),
      new Password(userModel.password),
      new UserType(userModel.type),
      userModel.creationDate
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({
      where: { email },
    });

    if (!userModel) {
      return null;
    }

    return new User(
      userModel.id,
      new Email(userModel.email),
      new Password(userModel.password),
      new UserType(userModel.type),
      userModel.creationDate
    );
  }

  async findById(id: number): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);

    if (!userModel) {
      return null;
    }

    return new User(
      userModel.id,
      new Email(userModel.email),
      new Password(userModel.password),
      new UserType(userModel.type),
      userModel.creationDate
    );
  }

  async update(user: User): Promise<User> {
    try {
      if (!user.id) {
        throw new Error("id user is required");
      }
      
      const updatedUser = await UserMongo.findOneAndUpdate(
        { id: user.id },
        {
          email: user.getEmail(),
          password: user.getPassword(),
          type: user.getType(),
          creationDate: user.creationDate
        },
        { new: true }
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const user = await UserMongo.findOneAndDelete({ id });
      if (!user) {
      throw new Error("User not found");
    }        

      console.log("User deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
}