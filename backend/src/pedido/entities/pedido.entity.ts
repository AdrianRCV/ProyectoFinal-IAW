import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'pedido' })
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'id_pedido' })
  idPedido: number;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'timestamp',
    name: 'fecha_pedido',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaPedido: Date;
}
