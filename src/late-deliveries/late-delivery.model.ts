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
export enum LATE_DELIVERY_STATUS {
  WAITING = 'WAITING',
  PICKED = 'PICKED',
  DONE = 'DONE',
}
@Table({ tableName: 'late_deliveries' })
export class LateDelivery extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(LATE_DELIVERY_STATUS)),
    defaultValue: LATE_DELIVERY_STATUS.WAITING,
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
