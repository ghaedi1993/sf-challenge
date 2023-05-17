import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
  
  @Table
  export class DelayReport extends Model {
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
    })
    id: number;
  }
  