import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
@Controller('tasks')
export class TasksController {
    
    constructor(private readonly taskService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    addTask(@Body('title') title: string, @Body('description') description : string): Task {
        return this.taskService.createTask(title, description);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body('isDone') isDone: boolean): Task{
        return this.taskService.updateTask(id, isDone);
    }

    @Patch(':id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }
}
