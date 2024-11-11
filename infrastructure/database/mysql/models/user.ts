import { Column, Model, PrimaryKey, Table, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

 
  validatePassword(password: string): boolean {
    return this.password === password;
  }
}

export default User;
