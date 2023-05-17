import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR_STAFF = 'VENDOR_STAFF',
  DELIVERY_DRIVER = 'DELIVERY_DRIVER',
  AGEN = 'AGEN',
}

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  salt: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
  })
  role: UserRole;
}
