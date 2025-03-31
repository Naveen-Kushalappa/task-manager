import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
@Controller('tasks')
export class TasksController {
    
    constructor(private readonly taskService: TasksService){}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    async addTask(@Body('title') title: string, @Body('description') description : string): Promise<Task> {
        return this.taskService.createTask(title, description);
    }

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body('isDone') isDone: boolean): Promise<Task>{
        return this.taskService.updateTask(id, isDone);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }
}
