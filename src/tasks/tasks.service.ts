import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    } 

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(title: string, description: string): Task{

        const newTask: Task = { id: randomUUID(), title, description, isDone: false};
        this.tasks.push(newTask);
        return newTask;
    } 

    updateTask(id: string, isDone: boolean): Task{
        const task = this.getTaskById(id);
        if(task){ 
            task.isDone = isDone;
        }
        return task;
    }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id);        
    }


}
