import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const task = service.createTask('Test task 1', 'Test task 1 description');
    expect (task).toBeDefined();
    expect (task.title).toBeDefined();
    expect (task.description).toBeDefined();
    expect (task.id).toBeDefined();
    expect (task.isDone).toBe(false);
  })

  it('should get all tasks', () => {
    service.createTask('Test task1', 'Test desciption1');
    service.createTask('Test task2', 'Test desciption2');

    const tasks = service.getAllTasks();
    expect (tasks).toBeDefined();
    expect (tasks.length).toBe(2);
  })

  it('should update a task', () => {
    const task = service.createTask('Test task1', 'Test task description');

    const id = task.id;
    const updatedTask = service.updateTask(id, true);

    expect (updatedTask.isDone).toBe(true);
  })

  it('should get a task by id', () => {

    const task = service.createTask('Test task1', 'Test task description');
    const id = task.id;
    expect (service.getTaskById(id).title === 'Test task1').toBe(true);
  })

  it('should delete a task by id', () => {
    const task = service.createTask('Test task1', 'Test task description');
    const id = task.id;
    service.deleteTask(id);
    expect (service.getTaskById(id)).toBeUndefined();
  })

});
