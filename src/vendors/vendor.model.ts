import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

@Table
export class Vendor extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @HasMany(() => Order)
  orders: Order[];
}
