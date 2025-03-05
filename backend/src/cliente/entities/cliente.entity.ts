import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'cliente' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  idCliente: number;

  @Column({ unique: true, type: 'varchar', length: 15 })
  telefono: string;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100 })
  direccion: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
    name: 'correo_electronico',
  })
  correoElectronico: string;

  @Column({
    type: 'timestamp',
    name: 'fecha_registro',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;
}
