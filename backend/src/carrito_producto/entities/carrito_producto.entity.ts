import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity('carrito_producto')
export class CarritoProducto {
  @PrimaryGeneratedColumn({ name: 'id_carrito_producto' })
  idCarritoProducto: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.productos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carrito_id' }) // Define la clave foránea explícitamente
  carrito: Carrito;

  @ManyToOne(() => Producto, (producto) => producto.idProducto, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn({ name: 'fecha_agregado', type: 'timestamp' })
  fechaAgregado: Date;
}
