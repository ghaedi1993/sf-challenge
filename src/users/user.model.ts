import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { LateDelivery } from 'src/late-deliveries/late-delivery.model';
import { Order } from 'src/orders/order.model';
import { Trip } from 'src/trips/trip.model';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  DELIVERY_DRIVER = 'DELIVERY_DRIVER',
  AGENT = 'AGENT',
}

@Table({ tableName: 'users' })
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

  @HasMany(() => Trip)
  trips: Trip[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => LateDelivery)
  lateDeliveries: LateDelivery[];
}
