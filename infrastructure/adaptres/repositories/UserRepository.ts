import { UserRepository as IUserRepository } from '../../../application/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import UserModel from '../../database/mysql/models/User'; // Le modèle Sequelize

export class UserRepository implements IUserRepository {
  // Méthode pour enregistrer un utilisateur
  async save(user: User): Promise<User> {
    // Créer un utilisateur dans la base de données avec Sequelize
    const userModel = await UserModel.create({
      email: user.email,
      password: user.password,
      type: user.type,
      creationDate: user.creationDate,
    } as any);

    // Transformer le modèle Sequelize en un objet métier User
    return new User(
      userModel.id, // id généré automatiquement
      userModel.email,
      userModel.password,
      userModel.type,
      userModel.creationDate
    );
  }

  // Méthode pour trouver un utilisateur par son email
  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({
      where: { email },
    });

    if (!userModel) {
      return null;
    }

    return new User(
      userModel.id,
      userModel.email,
      userModel.password,
      userModel.type,
      userModel.creationDate
    );
  }

  // Méthode pour trouver un utilisateur par son ID
  async findById(id: number): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);

    if (!userModel) {
      return null;
    }

    return new User(
      userModel.id,
      userModel.email,
      userModel.password,
      userModel.type,
      userModel.creationDate
    );
  }
}
