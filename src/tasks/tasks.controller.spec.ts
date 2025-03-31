import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const mockTaskModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: 'TaskModel',
          useValue: mockTaskModel
        }
      ]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const task: Task = {id: '1', isDone: false, title: 'Test task title', description: 'Test task description'};
    jest.spyOn(service, 'createTask').mockResolvedValue(task);

    expect(await controller.addTask('Test task title', 'Test task description')).toEqual(task);
  });

  it('should return all tasks', async() => {
    const tasks: Task[] = [{id: '1', isDone: false, title: 'Test task title', description: 'Test task description'}];

    jest.spyOn(service, 'getAllTasks').mockResolvedValue(tasks);

    const result = await controller.getAllTasks();
    expect(result.length).toEqual(1);

  });

  it('should return a task by id', async() => {
    const task: Task = {id: '1', isDone: false, title: 'Test title', 'description': 'Test description'};
    jest.spyOn(service, 'getTaskById').mockResolvedValue(task);

    expect(await controller.getTaskById('1')).toEqual(task);
  });

  it('should update a task by id', async() => {
    const task: Task = {id: '1', isDone: true, title: 'Test title', 'description': 'Test description'};

    jest.spyOn(service, 'updateTask').mockResolvedValue(task);

    expect(await controller.updateTask('1', true)).toEqual(task);
  });

  it('should delete a task by id',async() => {
    const task: Task = {id: '1', isDone: true, title: 'Test title', 'description': 'Test description'};

    jest.spyOn(service, 'deleteTask').mockImplementation(undefined);

    expect(await controller.deleteTask('1')).toBeUndefined();
  });


});
