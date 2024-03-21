/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Abrham Tafere",
      "email": "at@gmail.com",
      "role": "INTERN"
    },
    {
      "id": 2,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "ADMIN"
    },
    {
      "id": 3,
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "role": "INTERN"
    },
    {
      "id": 4,
      "name": "Emily Johnson",
      "email": "emily.johnson@example.com",
      "role": "ADMIN"
    },
    {
      "id": 5,
      "name": "Michael Brown",
      "email": "michael.brown@example.com",
      "role": "ENGINEER"
    }
  ];

  private getHighestId(): number {
    this.users.sort((a, b) => b.id - a.id);
    return this.users.length > 0 ? this.users[0].id : 0;
  }

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role){
        const rolesArray = this.users.filter(user=> user.role === role);
        
        if(!rolesArray.length) throw new NotFoundException('User Role Not Found')

        return rolesArray;
    }

    return {total: this.users.length, users: this.users};
  }

  findAllInterns(){
    return this.users.filter(user => user.role === "INTERN");
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)

    if(!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userId = this.getHighestId() + 1;
    const newUser = {
        id: userId,
        ...createUserDto
    }

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto){
    this.users = this.users.map(user => {
      if(user.id === id){
        return {...user, ...updateUserDto} 
      }
      return user;
    })

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter(user => user.id !== id);

    return removeUser;
  }

}
