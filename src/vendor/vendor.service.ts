import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UserService }  from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VendorService {
  constructor(private userService:UserService,
              private prisma:PrismaService
  ){}
  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAll() { 
    return this.prisma.user.findMany({
      where : {
        role:'vendor'
      },
      include : {
        vendor : {
          include : {
            vendorDocument: true
          },
        },
      },
      orderBy: {
        createdAt : 'desc'
      }
    });
  }
  getVendorForApproval(){
    return this.prisma.user.findMany({
      where : {
        role:'vendor',
        operationalStatus : 'pending',
        vendor : {
          varified : false,
          vendorDocument : {
            docStatus : 'pending'
          },
        },
      },
      include : {
        vendor : {
          include : {
            vendorDocument: true
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
