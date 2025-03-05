import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios') // Nombre de la tabla en MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
