import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';
import { Observable, of, throwError } from 'rxjs';
describe('TodoService', () => {
  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','get']);
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
    httpClientSpy.post.and.returnValue(of({}))
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:44309/ToDos',todoItem
    )
  });

  it('should response error when create failed', () => {
    // given
    const todoItem = new ToDoItem(0, '', '', false);
    httpClientSpy.post.and.returnValue(throwError(() => ({
      errorMessage: 'create failed'
    })))
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed')

  });

  it('should return specific todoItem when get given id', () => {
    
    // when
    service.findById(9);
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      'https://localhost:44309/ToDos/9')
  });
});
