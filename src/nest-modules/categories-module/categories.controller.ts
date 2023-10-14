import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';

import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.usecase';
import { UpdateCategoryUseCase } from '@core/category/application/use-cases/update-category/update-category.usecase';
import { DeleteCategoryUseCase } from '@core/category/application/use-cases/delete-category/delete-category.usecase';
import { GetCategoryUseCase } from '@core/category/application/use-cases/get-category/get-category.usecase';
import { ListCategoriesUseCase } from '@core/category/application/use-cases/list-category/list-category.usecase';
import { CategoryCollectionPresenter, CategoryPresenter } from './categories.presenter';
import { CategoryOutput } from '@core/category/application/use-cases/common/category-output';
import { SearchCategoriesDto } from './dto/search-categories.dto';

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
    console.log('createCategoryDto', createCategoryDto)
    const output = await this.createUseCase.execute(createCategoryDto)
    return new CategoryPresenter(output)
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCategoriesDto) {
    const output = await this.listUseCase.execute(searchParamsDto)
    return new CategoryCollectionPresenter(output)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
    const output = await this.getUseCase.execute({ id })
    return CategoriesController.serialize(output)
  }

  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const output = await this.updateUseCase.execute({ ...updateCategoryDto, id })
    return CategoriesController.serialize(output)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id })
  }

  static serialize(output: CategoryOutput) {
    return new CategoryPresenter(output)
  }
}
