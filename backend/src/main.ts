import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder().setTitle('Task Manager API')
    .setDescription('API documentation for the Task Manager application')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`🚀 Server is running on: http://localhost:3000`);
  console.log(`📝 Swagger Docs are live at: http://localhost:3000/api`);
}
bootstrap();
