import { AudioVideoMediaStatus } from '@core/shared/domain/value-objects/audio-video-media.vo';
import { ProcessAudioVideoMediasInput } from '@core/video/application/use-cases/process-audio-video-media/process-audio-video-medias.input';
import { ProcessAudioVideoMediasUseCase } from '@core/video/application/use-cases/process-audio-video-media/process-audio-video-medias.use-case';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, UseFilters, ValidationPipe } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { RabbitmqConsumeErrorFilter } from '../rabbitmq/rabbitmq-consume-error/rabbitmq-consume-error.filter';

@UseFilters(RabbitmqConsumeErrorFilter)
@Injectable()
export class VideosConsumers {
  constructor(private moduleRef: ModuleRef) {}

  @RabbitSubscribe({
    exchange: 'direct.delayed',
    routingKey: 'videos.convert',
    queue: 'micro-videos/admin',
    allowNonJsonMessages: true,
    queueOptions: {
      deadLetterExchange: 'dlx.exchange',
      deadLetterRoutingKey: 'videos.convert',
      //messageTtl: 5000 - tempo de vida da mensagem na fila para ser republicada
    },
  })
  async onProcessVideo(msg: {
    video: {
      resource_id: string; //video_id.field
      encoded_video_folder: string;
      status: 'COMPLETED' | 'FAILED';
    };
  }) {
    const resource_id = `${msg.video?.resource_id}`;
    const [video_id, field] = resource_id.split('.');
    const input = new ProcessAudioVideoMediasInput({
      video_id,
      field: field as 'trailer' | 'video',
      encoded_location: msg.video?.encoded_video_folder,
      status: msg.video?.status as AudioVideoMediaStatus,
    });

    await new ValidationPipe({
      errorHttpStatusCode: 422,
    }).transform(input, {
      metatype: ProcessAudioVideoMediasInput,
      type: 'body',
    });
    const useCase = await this.moduleRef.resolve(
      ProcessAudioVideoMediasUseCase,
    );
    await useCase.execute(input);
  }
}
