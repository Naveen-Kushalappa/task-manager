import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModel:  Model<TaskDocument>){}
    
    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.find().exec();
    } 

    async getTaskById(id: string): Promise<Task> {
        const task = this.taskModel.findOne({id}).exec(); //use findById if default _id of mongo is used
        if(!task) throw new NotFoundException(`Id: ${id} not found`);
        return task;
    }

    async createTask(title: string, description: string): Promise<Task>{
        const newTask = { id: randomUUID(), title, description};
        const task = new this.taskModel(newTask);
        return task.save();
    } 

    async updateTask(id: string, isDone: boolean): Promise<Task>{
        const task = this.taskModel.findOneAndUpdate({id}, {isDone: true}, {new: true}).exec();
        if(!task){ 
            throw new NotFoundException(`Id ${id} not found`);
        }
        return task;
    }

    async deleteTask(id: string): Promise<void>{
        const result = this.taskModel.findOneAndDelete({id}).exec();
        if(!result){
            throw new NotFoundException(`Id ${id} not found`);
        }
    }
}
