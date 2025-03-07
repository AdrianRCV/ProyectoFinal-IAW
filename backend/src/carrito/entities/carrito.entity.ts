import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';


@Entity('carrito')
export class Carrito {
    @PrimaryGeneratedColumn({ name: 'id_carrito' })
    idCarrito: number;

    
}
