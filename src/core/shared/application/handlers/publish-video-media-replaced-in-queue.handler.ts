import { OnEvent } from '@nestjs/event-emitter';
import { IDomainEventHandler } from '../domain-event-handler.interface';
import { VideoAudioMediaReplaced } from '@core/video/domain/domain-events/video-audio-media-replaced.event';

export class PublishVideoMediaReplacedInQueueHandler
  implements IDomainEventHandler
{
  @OnEvent(VideoAudioMediaReplaced.name)
  async handle(event: VideoAudioMediaReplaced): Promise<void> {
    console.log(event);
  }
}
