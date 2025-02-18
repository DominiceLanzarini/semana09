import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Role from "./Role";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({ name: "permissionRoles" })
  roles: Role[];
}
