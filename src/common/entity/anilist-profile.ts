import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { User } from "./user.js";

@Entity()
export class AnilistProfile {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public anilistId!: number;

  @Column()
  public name!: string;

  @Column()
  public largeAvatar!: string;

  @Column()
  public mediumAvatar!: string;

  @OneToOne(() => User, (user) => user.anilistUser)
  @JoinColumn()
  public user!: Relation<User>;
}
