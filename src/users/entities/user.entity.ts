import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Email address of the user' })
  @Index()
  @Column({ unique: true, length: 100 })
  email: string;

  @ApiProperty({ description: 'Hashed password of the user' })
  @Column({ length: 255 })
  password: string;

  @ApiProperty({ description: 'First name of the user' })
  @Column({ length: 50 })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @Column({ length: 50 })
  lastName: string;

  @ApiProperty({ description: 'Role of the user', enum: UserRole })
  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'Date when the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
} 