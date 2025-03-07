import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';
import { IsNotEmpty, Length, IsDecimal, Min } from 'class-validator';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  idProducto: number;

  @Column()
  @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
  imagen: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @Length(1, 50, { message: 'El nombre del producto debe tener entre 1 y 50 caracteres' })
  nombre_producto: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @Length(1, 50, { message: 'La categoría debe tener entre 1 y 50 caracteres' })
  categoria: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty({ message: 'El detalle no puede estar vacío' })
  @Length(1, 50, { message: 'El detalle debe tener entre 1 y 50 caracteres' })
  detalle: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal({}, { message: 'El precio debe ser un número decimal válido' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @ManyToOne(() => Proveedor, proveedor => proveedor.productos)
  proveedor: Proveedor;
}
