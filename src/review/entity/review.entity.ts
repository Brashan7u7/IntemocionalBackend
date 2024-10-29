import { Admin } from 'src/admin/entity/admin.entity';
import { Professional } from 'src/professional/entity/professional.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id_review: number;

  @Column({ nullable: false, unique: false })
  rating: number;

  @Column({ nullable: false, unique: false })
  date: Date;

  @ManyToOne(() => Admin, (admin: Admin) => admin.reviews, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_admin' })
  admin: Admin;

  @ManyToOne(() => User, (user: User) => user.reviews, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(
    () => Professional,
    (professional: Professional) => professional.reviews,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'id_professional' })
  professional: Professional;
}
