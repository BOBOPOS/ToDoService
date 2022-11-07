import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem when using mocked httpPost request', () => {
    // given
    const todoItem = new ToDoItem(0, '', '', false);
    // when
    service.create(todoItem)
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos',todoItem
    )
  });
});
