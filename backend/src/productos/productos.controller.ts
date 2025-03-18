import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<Producto[]> {
    return this.productosService.search(query);
  }

  @Post()
  async create(
    @Body() createProductoDto: CreateProductoDto,
  ): Promise<Producto> {
    const { nombre_producto, imagen, categoria, detalle, precio } =
      createProductoDto;
    return this.productosService.createProducto({
      nombre_producto,
      imagen,
      categoria,
      detalle,
      precio,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.productosService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ): Promise<any> {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.productosService.remove(+id);
  }
}