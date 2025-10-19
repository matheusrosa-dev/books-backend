import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RolesRepository } from '../app/users/repositories';
import { seedRoles } from './roles';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const rolesRepository = app.get(RolesRepository);

  await seedRoles(rolesRepository);

  await app.close();
  process.exit(0);
}
bootstrap();
