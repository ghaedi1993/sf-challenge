
import { Sequelize } from 'sequelize-typescript';
import { DelayReport } from 'src/delay-reports/delay-report.model';
import { LateDelivery } from 'src/late-deliveries/late-delivery.model';
import { Order } from 'src/orders/order.model';
import { Trip } from 'src/trips/trip.model';
import { User } from 'src/users/user.model';
import { Vendor } from 'src/vendors/vendor.model';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        logging:false,
      });
      sequelize.addModels([Vendor,Order,User,DelayReport,Trip,LateDelivery]);
      process.env.NODE_ENV === 'development' && await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
// export const databaseProviders = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async (configService: ConfigService) => {
//       const sequelize = new Sequelize({
//         dialect: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//       });
//       sequelize.addModels([Vendor, Order]);
//       await sequelize.sync();
//       return sequelize;
//     },
//     inject: [ConfigService],
//   },
// ];