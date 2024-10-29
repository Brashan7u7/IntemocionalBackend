import { Professional } from 'src/professional/entity/professional.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  id_service: number;

  @Column({ nullable: false, unique: false })
  name_service: string;

  @Column({ nullable: false, unique: false })
  description: string;

  @Column({ nullable: false, unique: false })
  price: number;

  @ManyToMany(
    () => Professional,
    (profesional: Professional) => profesional.services,
  )
  professionals: Professional[];
}
