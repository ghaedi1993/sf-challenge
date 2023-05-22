import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorsModule } from './vendors/vendors.module';
import { OrdersModule } from './orders/orders.module';
import { TripsModule } from './trips/trips.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DelayReportsModule } from './delay-reports/delay-reports.module';
import { LateDeliveriesModule } from './late-deliveries/late-deliveries.module';
import { DatabaseModule } from './database/database.module';
const isRunningInDocker = process.env.DOCKER_CONTAINER === 'true';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'test' ? '.test.env' : '.development.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: isRunningInDocker ? configService.get<string>('DB_HOST') : 'localhost',
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        logging: false,
      }),
    }),
    UsersModule,
    VendorsModule,
    OrdersModule,
    TripsModule,
    DelayReportsModule,
    LateDeliveriesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
