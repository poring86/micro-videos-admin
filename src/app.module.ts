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
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQFakeConsumer } from './rabbitmq-fake.consumer';
import { RabbitmqFakeController } from './rabbitmq-fake/fake.controller';

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
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@rabbitmq:5672',
    }),
  ],
  providers: [RabbitMQFakeConsumer],
  controllers: [RabbitmqFakeController],
})
export class AppModule {}
