import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://archnatushar18:LOlPJGh4xtesezoY@cluster0.20ygp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Fallback in case it's undefined
  ],
})
export class DatabaseModule {}
