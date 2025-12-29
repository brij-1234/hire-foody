import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class BookingService {
    constructor(private prisma:PrismaService){}
    
    getCustomerBookings(){
        return this.prisma.booking.findMany({
            include : {
                vendor : true, 
                user : true
            }
        })
    }

    getInfluencerBooking(){
        return this.prisma.influencerCollaboration.findMany({
            include : {
                vendor : {
                    include : {
                        user : true
                    }
                },
                influencer : {
                    include : {
                        user : true
                    }
                },
                influencerReview : {
                    select : {
                        id : true,
                        moderationStatus : true
                    }
                }
            }
        });
    }
}
