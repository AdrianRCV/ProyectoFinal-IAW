import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  //   @IsNotEmpty({ message: 'El id_cliente no puede estar vacío' }) // este valor no puede ser NULL
  //   @IsNumber({}, { message: 'El id del cliente debe ser un número' }) // nos aseguramos que sea un número
  //   idcliente: number;

  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono: string;

  @IsNotEmpty() // este valor no puede ser NULL
  @IsString({ message: 'nombre debe ser una cadena de texto' }) // verifica que el campo sea una cadena de texto
  nombre: string;

  @IsNotEmpty() // este valor no puede ser NULL
  @IsString({ message: 'apellidos debe ser una cadena de texto' }) // verifica que el campo sea una cadena de texto
  apellidos: string;
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  direccion: string;

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  correoElectronico: string;
}
