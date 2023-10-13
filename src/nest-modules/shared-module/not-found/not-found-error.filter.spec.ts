import { Entity } from '@core/shared/domain/entity';
import { NotFoundErrorFilter } from './not-found-error.filter';
import { NotFoundError } from '@core/shared/domain/errors/not-found.error';
import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

class StubEntity extends Entity {
  entity_id: any
  toJSON(): Required<any> {
    return {}
  }
}

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new NotFoundError('fake id', StubEntity)
  }
}

describe('NotFoundErrorFilter Unit Tests', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController]
    }).compile()
    app = moduleFixture.createNestApplication()
    app.useGlobalFilters(new NotFoundErrorFilter())
    await app.init()
  })

  it('should catch a EntityValidationError', () => {
    return request(app.getHttpServer()).get('/stub').expect(404).expect({
      statusCode: 404,
      error: 'Not found',
      message: 'StubEntity Not Found using ID fake id'
    })
  });
});
