import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { CarritoProducto } from 'src/carrito_producto/entities/carrito_producto.entity';

@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn({ name: 'id_carrito' })
  idCarrito: number;

  @ManyToOne(() => User, (user) => user.carritos)
  usuario: User;

  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.carrito,
  )
  productos: CarritoProducto[];

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
