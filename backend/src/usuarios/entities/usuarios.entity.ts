import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity('usuarios') // Nombre de la tabla en MySQL
export class User {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ unique: true, type: 'varchar', length: 15 })
  @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
  @Length(1, 15, { message: 'El usuario debe tener entre 1 y 15 caracteres' })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 100, name: 'correo_electronico' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Length(1, 50, { message: 'Los apellidos deben tener entre 1 y 50 caracteres' })
  apellidos: string;

  @Column({ unique: true, type: 'varchar', length: 15, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Length(1, 100, { message: 'La dirección debe tener entre 1 y 100 caracteres' })
  direccion: string;

  @Column({ type: 'timestamp', name: 'fecha_registro', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @OneToMany(() => Carrito, carrito => carrito.usuario)
  carritos: Carrito[];
}