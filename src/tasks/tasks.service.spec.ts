import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './tasks.model';
import mongoose, { Schema } from 'mongoose';
import { TaskSchema } from './schemas/task.schema';
import { after } from 'node:test';

describe('TasksService', () => {
  let service: TasksService;
  let mongod: MongoMemoryServer;
  beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema}]),
      ],
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop()
  }, 50000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await service.createTask('Test task 1', 'Test task 1 description');
    expect (task).toBeDefined();
    expect (task.title).toBeDefined();
    expect (task.description).toBeDefined();
    expect (task.id).toBeDefined();
    expect (task.isDone).toBe(false);
  })

  it('should get all tasks', async() => {
    await service.createTask('Test task1', 'Test desciption1');
    await service.createTask('Test task2', 'Test desciption2');

    const tasks = await service.getAllTasks();
    expect (tasks).toBeDefined();
    expect (tasks.length).toBe(3); //since the memory is not cleared it shouls be 3
  })

  it('should update a task', async() => {
    const task = await service.createTask('Test task1', 'Test task description');

    const id = task.id; //check this
    console.log('id', id);
    const updatedTask = await service.updateTask(id, true);

    expect (updatedTask.isDone).toBe(true);
  })

  it('should get a task by id', async() => {

    const task = await service.createTask('Test task1', 'Test task description');
    const id = task.id;

    const foundTask = await service.getTaskById(id)
    expect (foundTask.title === 'Test task1').toBe(true);
  })

  it('should delete a task by id', async() => {
    const task = await service.createTask('Test task1', 'Test task description');
    const id = task.id;
    console.log('id', id);
    await service.deleteTask(id);
    const foundTask = await service.getTaskById(id);
    console.log('foundTask', foundTask);

    expect (foundTask).toBeNull();
  })

});
