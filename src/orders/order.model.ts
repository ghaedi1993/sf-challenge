import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { DelayReport } from 'src/delay-reports/delay-report.model';
import { LateDelivery } from 'src/late-deliveries/late-delivery.model';
import { Trip } from 'src/trips/trip.model';
import { User } from 'src/users/user.model';
import { Vendor } from 'src/vendors/vendor.model';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  delivery_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expected_delivery_time: Date;

  @ForeignKey(() => Vendor)
  @Column
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @ForeignKey(() => User)
  @Column
  customerId: number;

  @BelongsTo(() => User)
  customer: User;

  @HasMany(() => DelayReport)
  delayReports: DelayReport[];

  @HasOne(() => Trip)
  trip: Trip;

  @HasMany(() => LateDelivery)
  lateDeliveries: LateDelivery[];
}
