import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, } from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('proveedor')
export class Proveedor {
    @PrimaryGeneratedColumn({ name: 'id_proveedor' })
    idProveedor: number;

    @Column({ unique: true, type: 'varchar', length: 100 })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    correoElectronico: string;
    
    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
    nombre: string;

    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty({ message: 'Los apellidos no pueden estar vacíos' })
    @Length(1, 50, { message: 'Los apellidos deben tener entre 1 y 50 caracteres' })
    apellidos: string;

    @Column({ type: 'varchar', length: 15 })
    @IsNotEmpty({ message: 'El contacto no puede estar vacío' })
    @Length(1, 30, { message: 'El contacto debe tener entre 1 y 30 caracteres' })
    contacto: string;

    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    telefono: string;

    @OneToMany(() => Producto, producto => producto.proveedor)
    productos: Producto[];
}