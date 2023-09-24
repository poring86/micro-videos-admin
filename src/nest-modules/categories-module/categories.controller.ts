import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CategorySequelizeRepository } from '@core/category/infra/db/sequelize/category-sequelize.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryRepo: CategorySequelizeRepository) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {

  }

  @Get()
  findAll() {

  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {

  }

  @Delete(':id')
  remove(@Param('id') id: string) {

  }
}
