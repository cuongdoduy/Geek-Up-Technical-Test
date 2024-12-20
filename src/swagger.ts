import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  /**
   * Configures the Swagger documentation options for the Ecommerce API.
   * 
   * - Title: Ecommerce API Docs
   * - Description: ⚡️ 
   * - Version: 1.0
   * - Base Path: api
   * - Tags: Endpoints
   * - Authentication: Bearer Auth
   */
  const options = new DocumentBuilder()
    .setTitle('Ecommerce API Docs')
    .setDescription('This is the Ecommerce API documentation.⚡️')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('Endpoints')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
