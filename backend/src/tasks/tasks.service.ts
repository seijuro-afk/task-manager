import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Create a new task
  async create(createTaskDto: { title: string; description?: string; userId: number }) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  // Fetch all tasks
  async findAll() {
    return this.prisma.task.findMany({
      include: { user: true }, // Optional: includes user profile info
    });
  }

  // Find one task by its ID
  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  // Update a task (like checking it off as completed)
  async update(id: number, updateTaskDto: { title?: string; description?: string; isCompleted?: boolean }) {
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