import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', () => {
    const task: Task = {id: '1', isDone: false, title: 'Test task title', description: 'Test task description'};
    jest.spyOn(service, 'createTask').mockReturnValue(task);

    expect(controller.addTask('Test task title', 'Test task description')).toEqual(task);
  });

  it('should return all tasks', () => {
    const tasks: Task[] = [{id: '1', isDone: false, title: 'Test task title', description: 'Test task description'}];

    jest.spyOn(service, 'getAllTasks').mockReturnValue(tasks);

    expect(controller.getAllTasks().length).toEqual(1);

  });

  it('should return a task by id', () => {

    const task: Task = {id: '1', isDone: false, title: 'Test title', 'description': 'Test description'};
    jest.spyOn(service, 'getTaskById').mockReturnValue(task);

    expect(controller.getTaskById('1')).toEqual(task);
  });

  it('should update a task by id', () => {
    const task: Task = {id: '1', isDone: true, title: 'Test title', 'description': 'Test description'};

    jest.spyOn(service, 'updateTask').mockReturnValue(task);

    expect(controller.updateTask('1', true)).toEqual(task);
  });
  
  it('should delete a task by id', () => {
    const task: Task = {id: '1', isDone: true, title: 'Test title', 'description': 'Test description'};

    jest.spyOn(service, 'deleteTask').mockImplementation(() => {});

    expect(controller.deleteTask('1')).toBeUndefined();
  });


});
