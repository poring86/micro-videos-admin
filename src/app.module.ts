import { Module } from '@nestjs/common';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './nest-modules/shared-module/shared.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoriesModule, DatabaseModule, SharedModule],
})
export class AppModule { }
