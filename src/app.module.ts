import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorsModule } from './vendors/vendors.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { TripsModule } from './trips/trips.module';
import { ConfigModule } from '@nestjs/config';
import { DelayReportsModule } from './delay-reports/delay-reports.module';
import { LateDeliveriesModule } from './late-deliveries/late-deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    VendorsModule,
    OrdersModule,
    TripsModule,
    DelayReportsModule,
    LateDeliveriesModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
