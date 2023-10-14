import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { WrapperDataInterceptor } from "./shared-module/interceptors/wrapper-data/wrapper-data.interceptor";
import { NotFoundErrorFilter } from "./shared-module/not-found/not-found-error.filter";
import { Reflector } from "@nestjs/core";
import { EntityValidationErrorFilter } from "./shared-module/not-found/entity-validation-error.filter";

export function applyGlobalConfig(app: INestApplication) {
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     errorHttpStatusCode: 422,
  //     transform: true,
  //   }),
  // );
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new NotFoundErrorFilter(),
  );
}