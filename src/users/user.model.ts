
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
  salt: string
}
