import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { User  } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){}
    private saltOrRounds = 10;
    async createUser(data : {name: string; email: string; phone: string; password: string; role: string;}){

        const existintUser = await this.prisma.user.findUnique({
            where: {email: data.email}
        });
        
        if(existintUser){
            throw new ConflictException('User with this email already exists');
        }
        
        const hash_password = await bcrypt.hash(data.password, this.saltOrRounds);
        const newUser = await this.prisma.user.create({
            data: {
                ...data,
                password: hash_password,
            }
        });

        return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
        };
    } 

    async findOne(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async getUsersByRole(role: 'customer' | 'vendor' | 'influencer'): Promise<User[]>{
        return await this.prisma.user.findMany({
            where: {role: role},
            include : {
                vendor: true,
            }
        });
    }

}
