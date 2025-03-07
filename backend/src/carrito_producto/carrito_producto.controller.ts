import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarritoProductoService } from './carrito_producto.service';
import { CreateCarritoProductoDto } from './dto/create-carrito_producto.dto';
import { UpdateCarritoProductoDto } from './dto/update-carrito_producto.dto';

@Controller('carrito-producto')
export class CarritoProductoController {
  constructor(private readonly carritoProductoService: CarritoProductoService) {}

  @Post()
  create(@Body() createCarritoProductoDto: CreateCarritoProductoDto) {
    return this.carritoProductoService.create(createCarritoProductoDto);
  }

  @Get()
  findAll() {
    return this.carritoProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarritoProductoDto: UpdateCarritoProductoDto) {
    return this.carritoProductoService.update(+id, updateCarritoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoProductoService.remove(+id);
  }
}
