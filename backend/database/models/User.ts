import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  PrimaryKey,
  CreatedAt,
  AllowNull,
  Unique,
  Default,
  HasMany,
  UpdatedAt,
} from 'sequelize-typescript';
import Task from './Task';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstname!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastname!: string;

  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date;

  @HasMany(() => Task)
  tasks!: Task[];
}
