import { Appointment } from 'src/appointment/entity/appointment.entity';
import { Review } from 'src/review/entity/review.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: false })
  name: string;

  @Column({ nullable: false, unique: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: false })
  password: string;

  @Column({ nullable: true, unique: false })
  location: string;

  @OneToMany(
    () => Appointment,
    (appointments: Appointment) => appointments.user,
  )
  appointments: Appointment[];

  @OneToMany(() => Review, (review: Review) => review.user)
  reviews: Review[];
}
