import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreatePedidoDto {
    @IsNotEmpty({ message: 'El ID del cliente no puede estar vacío' })
    @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
    idCliente: number;
  
    @IsNotEmpty({ message: 'El total no puede estar vacío' })
    @IsNumber({}, { message: 'El total debe ser un número válido' })
    @IsPositive({ message: 'El total debe ser un número positivo' })
    total: number;
}
