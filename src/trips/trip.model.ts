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

export enum TripStatus {
  ASSIGNED = 'ASSIGNED',
  AT_VENDOR = 'AT_VENDOR',
  PICKED = 'PICKED',
  DELIVERED = 'DELIVERED',
}

@Table({ tableName: 'trips' })
export class Trip extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(TripStatus)),
    allowNull: true,
  })
  status: TripStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deliveredAt: Date;

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
