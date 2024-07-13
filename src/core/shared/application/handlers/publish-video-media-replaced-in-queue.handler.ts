import { OnEvent } from '@nestjs/event-emitter';
import { IIntegrationEventHandler } from '../domain-event-handler.interface';
import { VideoAudioMediaUploadedIntegrationEvent } from '@core/video/domain/domain-events/video-audio-media-replaced.event';
import { IMessageBroker } from '../message-broker.interface';

export class PublishVideoMediaReplacedInQueueHandler
  implements IIntegrationEventHandler
{
  constructor(private messageBroker: IMessageBroker) {
    // console.log(messageBroker);
  }

  @OnEvent(VideoAudioMediaUploadedIntegrationEvent.name)
  async handle(event: VideoAudioMediaUploadedIntegrationEvent): Promise<void> {
    console.log(event);
  }
}
