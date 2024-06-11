import { IVideoRepository } from '@core/video/domain/video.repository';
import { UploadImageMediasUseCase } from '../upload-image-medias.use-case';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { IGenreRepository } from '@core/genre/domain/genre.repository';
import { ICastMemberRepository } from '@core/cast-member/domain/cast-member.repository';
import { UnitOfWorkSequelize } from '@core/shared/infra/db/sequelize/unit-of-work-sequelize';
import { IStorage } from '@core/shared/application/storage.interface';
import { setupSequelizeForVideo } from '@core/video/infra/db/sequelize/testing/helpers';
import { CategorySequelizeRepository } from '@core/category/infra/db/sequelize/category-sequelize.repository';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import {
  CastMemberModel,
  CastMemberSequelizeRepository,
} from '@core/cast-member/infra/db/sequelize/cast-member-sequelize';
import { GenreModel } from '@core/genre/infra/db/sequelize/genre.model';
import { GenreSequelizeRepository } from '@core/genre/infra/db/sequelize/genre-sequelize.repository';
import { VideoModel } from '@core/video/infra/db/sequelize/video.model';
import { InMemoryStorage } from '@core/shared/infra/storage/in-memory.storage';
import { VideoSequelizeRepository } from '@core/video/infra/db/sequelize/video-sequelize.repository';
import { NotFoundError } from '@core/shared/domain/errors/not-found.error';
import { Video } from '@core/video/domain/video.aggregate';
import { Category } from '@core/category/domain/category.aggregate';
import { Genre } from '@core/genre/domain/genre.aggregate';
import { CastMember } from '@core/cast-member/domain/cast-member.aggregate';
import { EntityValidationError } from '@core/shared/domain/validators/validation.error';

describe('UploadImageMediasUseCase Integration Tests', () => {
  let uploadImageMediasUseCase: UploadImageMediasUseCase;
  let videoRepo: IVideoRepository;
  let categoryRepo: ICategoryRepository;
  let genreRepo: IGenreRepository;
  let castMemberRepo: ICastMemberRepository;
  let uow: UnitOfWorkSequelize;
  let storageService: IStorage;
  const sequelizeHelper = setupSequelizeForVideo();

  beforeEach(() => {
    uow = new UnitOfWorkSequelize(sequelizeHelper.sequelize);
    categoryRepo = new CategorySequelizeRepository(CategoryModel);
    genreRepo = new GenreSequelizeRepository(GenreModel, uow);
    castMemberRepo = new CastMemberSequelizeRepository(CastMemberModel);
    videoRepo = new VideoSequelizeRepository(VideoModel, uow);
    storageService = new InMemoryStorage();

    uploadImageMediasUseCase = new UploadImageMediasUseCase(
      uow,
      videoRepo,
      storageService,
    );
  });

  it('should throw error when video not found', async () => {
    await expect(
      uploadImageMediasUseCase.execute({
        video_id: '4e9e2e4e-4b4a-4b4a-8b8b-8b8b8b8b8b8b',
        field: 'banner',
        file: {
          raw_name: 'banner.jpg',
          data: Buffer.from(''),
          mime_type: 'image/jpg',
          size: 100,
        },
      }),
    ).rejects.toThrowError(
      new NotFoundError('4e9e2e4e-4b4a-4b4a-8b8b-8b8b8b8b8b8b', Video),
    );
  });

  it('should throw error when image is invalid', async () => {
    expect.assertions(2);
    const category = Category.fake().aCategory().build();
    await categoryRepo.insert(category);
    const genre = Genre.fake()
      .aGenre()
      .addCategoryId(category.category_id)
      .build();
    await genreRepo.insert(genre);
    const castMember = CastMember.fake().anActor().build();
    await castMemberRepo.insert(castMember);
    const video = Video.fake()
      .aVideoWithoutMedias()
      .addCategoryId(category.category_id)
      .addGenreId(genre.genre_id)
      .addCastMemberId(castMember.cast_member_id)
      .build();

    await videoRepo.insert(video);

    try {
      await uploadImageMediasUseCase.execute({
        video_id: video.video_id.id,
        field: 'banner',
        file: {
          raw_name: 'banner.jpg',
          data: Buffer.from(''),
          mime_type: 'image/jpg',
          size: 100,
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(EntityValidationError);
      expect(error.error).toEqual([
        {
          banner: [
            'Invalid media file mime type: image/jpg not in image/jpeg, image/png, image/gif',
          ],
        },
      ]);
    }
  });

  it('should upload banner image', async () => {
    const storeSpy = jest.spyOn(storageService, 'store');
    const category = Category.fake().aCategory().build();
    await categoryRepo.insert(category);
    const genre = Genre.fake()
      .aGenre()
      .addCategoryId(category.category_id)
      .build();
    await genreRepo.insert(genre);
    const castMember = CastMember.fake().anActor().build();
    await castMemberRepo.insert(castMember);
    const video = Video.fake()
      .aVideoWithoutMedias()
      .addCategoryId(category.category_id)
      .addGenreId(genre.genre_id)
      .addCastMemberId(castMember.cast_member_id)
      .build();

    await videoRepo.insert(video);

    await uploadImageMediasUseCase.execute({
      video_id: video.video_id.id,
      field: 'banner',
      file: {
        raw_name: 'banner.jpg',
        data: Buffer.from('test data'),
        mime_type: 'image/jpeg',
        size: 100,
      },
    });

    const videoUpdated = await videoRepo.findById(video.video_id);
    expect(videoUpdated!.banner).toBeDefined();
    expect(videoUpdated!.banner!.name.includes('.jpg')).toBeTruthy();
    expect(videoUpdated!.banner!.location).toBe(
      `videos/${videoUpdated!.video_id.id}/images`,
    );
    expect(storeSpy).toHaveBeenCalledWith({
      data: Buffer.from('test data'),
      id: videoUpdated!.banner!.url,
      mime_type: 'image/jpeg',
    });
  });
});
