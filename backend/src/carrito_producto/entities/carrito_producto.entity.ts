import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity('carrito_producto')
export class CarritoProducto {
    @PrimaryGeneratedColumn({ name: 'id_carrito_producto' })
    idCarritoProducto: number;

    @ManyToOne(() => Carrito, carrito => carrito.productos)
    carrito: Carrito;

    @ManyToOne(() => Producto, producto => producto.idProducto)
    producto: Producto;

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;
}

