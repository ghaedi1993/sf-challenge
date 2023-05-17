import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
  
  @Table
  export class LateDelivery extends Model {
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
    })
    id: number;
  
    @Column
    name: string;
  }
  