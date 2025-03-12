import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  create(@Body() createCarritoDto: CreateCarritoDto) {
    return this.carritoService.create(createCarritoDto);
  }

  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  @Get(':id') 
  findOne(@Param('id') id: number) {
    return this.carritoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarritoDto: Partial<CreateCarritoDto>) {
    return this.carritoService.update(+id, updateCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carritoService.remove(+id);
  }

  @Post(':carritoId/producto/:productoId')
  addProduct(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number, @Body('cantidad') cantidad: number) {
    return this.carritoService.addProduct(+carritoId, +productoId, cantidad);
  }

  @Delete(':carritoId/producto/:productoId')
  removeProduct(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number) {
    return this.carritoService.removeProduct(+carritoId, +productoId);
  }
}
