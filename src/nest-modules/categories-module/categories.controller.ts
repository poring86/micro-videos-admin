import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UsePipes, ValidationPipe } from '@nestjs/common';

import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.usecase';
import { UpdateCategoryUseCase } from '@core/category/application/use-cases/update-category/update-category.usecase';
import { DeleteCategoryUseCase } from '@core/category/application/use-cases/delete-category/delete-category.usecase';
import { GetCategoryUseCase } from '@core/category/application/use-cases/get-category/get-category.usecase';
import { ListCategoriesUseCase } from '@core/category/application/use-cases/list-category/list-category.usecase';
import { CategoryPresenter } from './categories.presenter';
import { CategoryOutput } from '@core/category/application/use-cases/common/category-output';

@Controller('categories')
export class CategoriesController {

  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase

  @Inject(DeleteCategoryUseCase)
  private deleteUseCase: DeleteCategoryUseCase

  @Inject(GetCategoryUseCase)
  private getUseCase: GetCategoryUseCase

  @Inject(ListCategoriesUseCase)
  private listUseCase: ListCategoriesUseCase


  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createUseCase.execute(createCategoryDto)
    return new CategoryPresenter(output)
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

  static serialize(output: CategoryOutput) {
    return new CategoryPresenter(output)
  }
}
