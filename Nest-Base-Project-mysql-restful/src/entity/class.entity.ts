import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('class')
export class Role {
  @PrimaryGeneratedColumn()
  class_id: number;

  @Column()
  @ApiProperty({ description: '分类名称', required: true })
  class_name: string

  @Column()
  @ApiProperty({ description: '分类描述', required: true })
  class_brief: string;
}