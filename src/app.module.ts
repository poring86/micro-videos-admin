import { Module } from '@nestjs/common';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { SharedModule } from './nest-modules/shared-module/shared.module';
import { CastMembersModule } from './nest-modules/cast-members-module/cast-members.module';
import { GenresModule } from './nest-modules/genres-module/genres.module';
import { VideosModule } from './nest-modules/videos-module/videos.module';
import { EventModule } from './nest-modules/event-module/event.module';
import { UseCaseModule } from './nest-modules/use-case-module/use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoriesModule,
    CastMembersModule,
    DatabaseModule,
    SharedModule,
    GenresModule,
    VideosModule,
    EventModule,
    UseCaseModule,
  ],
})
export class AppModule {}
