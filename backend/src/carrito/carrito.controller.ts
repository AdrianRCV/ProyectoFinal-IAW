import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoProductoService } from 'src/carrito_producto/carrito_producto.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';

@Controller('carrito')
export class CarritoController {
  constructor(
    private readonly carritoService: CarritoService,
    private readonly carritoProductoService: CarritoProductoService,
  ) {}

  @Post()
  async create(@Body() createCarritoDto: CreateCarritoDto) {
    return this.carritoService.create(createCarritoDto);
  }

  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  @Get(':id_cliente')
  async findOne(@Param('id_cliente') id_cliente: number) {
    const carrito = await this.carritoService.findOneByUserId(id_cliente);
    if (!carrito) throw new NotFoundException('Carrito no encontrado');
    return carrito;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCarritoDto: Partial<CreateCarritoDto>,
  ) {
    return this.carritoService.update(+id, updateCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carritoService.remove(+id);
  }

  @Post(':carritoId/producto/:productoId')
  async addProductToCart(
    @Param('carritoId') carritoId: number,
    @Param('productoId') productoId: number,
    @Body() body: { cantidad: number },
  ) {
    const carrito = await this.carritoService.findOneByUserId(carritoId);
    if (!carrito) throw new NotFoundException('Carrito no encontrado');

    const producto =
      await this.carritoProductoService.findProductoById(productoId);
    if (!producto) throw new NotFoundException('Producto no encontrado');

    await this.carritoProductoService.addProductToCarrito(
      carritoId,
      productoId,
      body.cantidad,
    );
    return { message: 'Producto añadido al carrito correctamente' };
  }

  @Delete(':carritoId/producto/:productoId')
  async removeProduct(
    @Param('carritoId') carritoId: number,
    @Param('productoId') productoId: number,
  ) {
    await this.carritoService.removeProduct(+carritoId, +productoId);
    return { message: 'Producto eliminado del carrito correctamente' };
  }
}
