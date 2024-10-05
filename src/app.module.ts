import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './db/db.config'

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }), 
    DbModule, 
    UsersModule, 
    AuthModule]
})
export class AppModule { }
