import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { VendorModule } from './vendor/vendor.module';
import { BookingModule } from './booking/booking.module';
import { InfluencerModule } from './influencer/influencer.module';
import { ReviewModule } from './review/review.module';
import { CaslModule } from './casl/casl.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, VendorModule, BookingModule, InfluencerModule, ReviewModule, CaslModule],
  //controllers: [AppController, AuthController],
  controllers: [AppController, CustomersController],
  providers: [AppService, UserService , {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, CustomersService],
})
export class AppModule {}
