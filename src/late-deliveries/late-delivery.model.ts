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
enum LATE_DELIVERY_STATUS {
  WAITING = 'WAITING',
  PICKED = 'PICKED',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
}
@Table
export class LateDelivery extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(LATE_DELIVERY_STATUS)),
    allowNull: false,
  })
  status: LATE_DELIVERY_STATUS;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => User)
  @Column
  agentId: number;

  @BelongsTo(() => User)
  agent: User;
}
