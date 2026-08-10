import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  // Fetch all tasks with optional filtering
  async findAll(filterDto?: TaskFilterDto) {
    const where: any = {};
    if (filterDto?.userId) {
      where.userId = filterDto.userId;
    }
    if (filterDto?.isCompleted !== undefined) {
      where.isCompleted = filterDto.isCompleted;
    }
    if (filterDto?.fromDate || filterDto?.toDate) {
      where.createdAt = {} as any;
      if (filterDto.fromDate) {
        where.createdAt.gte = new Date(filterDto.fromDate);
      }
      if (filterDto.toDate) {
        where.createdAt.lte = new Date(filterDto.toDate);
      }
    }

    return this.prisma.task.findMany({
      where,
      include: { user: true },
    });
  }

  // Find one task by its ID
  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  // Update a task (like checking it off as completed)
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  // Delete a task
  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}