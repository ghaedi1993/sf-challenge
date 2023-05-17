import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'trips' })
export class Trip extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => User)
  @Column
  deliveryDriverId: number;

  @BelongsTo(() => User)
  deliverDriver: User;
}
