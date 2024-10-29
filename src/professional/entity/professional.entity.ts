import { Admin } from 'src/admin/entity/admin.entity';
import { Appointment } from 'src/appointment/entity/appointment.entity';
import { Review } from 'src/review/entity/review.entity';
import { Service } from 'src/service/entity/service.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('professional')
export class Professional {
  @PrimaryGeneratedColumn()
  id_professional: number;

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

  @Column({ nullable: false, unique: false })
  speciality: string;

  @Column({ nullable: true, unique: false })
  experience_years: number;

  @ManyToOne(() => Admin, (admin: Admin) => admin.professionals, {
    onDelete: 'SET NULL',
  })
  admin: Admin;

  @OneToMany(
    () => Appointment,
    (appointment: Appointment) => appointment.professional,
  )
  appointments: Appointment[];

  @OneToMany(() => Review, (review: Review) => review.professional)
  reviews: Review[];

  @ManyToMany(() => Service, (service: Service) => service.professionals)
  @JoinTable()
  services: Service[];
}
