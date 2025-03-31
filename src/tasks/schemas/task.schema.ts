import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID, UUID } from "crypto";
import { HydratedDocument } from "mongoose";
// import { Task } from "../tasks.model";
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task{

    @Prop({ default: randomUUID})
    id: string; //add explicit id instead of default _id of mongo

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, default: false})
    isDone: boolean;
    
}


export const TaskSchema = SchemaFactory.createForClass(Task)