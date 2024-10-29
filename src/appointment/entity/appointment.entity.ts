import { Professional } from 'src/professional/entity/professional.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn()
  id_appointment: number;

  @Column({ nullable: false })
  end_time: Date;
  @Column({ nullable: false })
  starting_time: Date;
  @Column({ nullable: false })
  appointment_status: string;
  @Column({ nullable: false })
  color: string;

  @ManyToOne(() => User, (user: User) => user.appointments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(
    () => Professional,
    (professional: Professional) => professional.appointments,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'professionalid' })
  professional: Professional;
}
