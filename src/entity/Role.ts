import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import  User  from "./User";
import { Permission } from "./Permission";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: "userRoles" })
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable({name: 'permissionRoles'})
  permissions: Permission[]
}
