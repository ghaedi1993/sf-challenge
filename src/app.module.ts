import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorsModule } from './vendors/vendors.module';
import { OrdersModule } from './orders/orders.module';
import { TripsModule } from './trips/trips.module';
import { ConfigModule } from '@nestjs/config';
import { DelayReportsModule } from './delay-reports/delay-reports.module';
import { LateDeliveriesModule } from './late-deliveries/late-deliveries.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'test' ? '.test.env' : '.development.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: Boolean(process.env.SYNCHRONIZE),
    }),
    UsersModule,
    VendorsModule,
    OrdersModule,
    TripsModule,
    DelayReportsModule,
    LateDeliveriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
