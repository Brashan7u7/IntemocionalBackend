import { Professional } from 'src/professional/entity/professional.entity';
import { Review } from 'src/review/entity/review.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id_admin: number;

  @Column({ nullable: false, unique: false })
  name: string;

  @Column({ nullable: false, unique: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: false })
  password: string;

  @OneToMany(
    () => Professional,
    (professional: Professional) => professional.admin,
  )
  professionals: Professional[];

  @OneToMany(() => Review, (review: Review) => review.admin)
  reviews: Review[];
}
