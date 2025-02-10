import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: new Date })
  createdAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: "UserRoles" })
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable({name: 'PermissionRoles'})
  permissions: Permission[]
}
