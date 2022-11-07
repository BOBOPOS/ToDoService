import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  public errorMessage: any  = '';
  constructor(private todoStore: TodoStoreService,private todoApi: TodoApiService) {
  }
  
  public get todoItems(): Array<ToDoItem> {
    return this.todoStore.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoApi.create(todoItem).subscribe({
      next: respones => { },
      error: error => {
        this.errorMessage = error.errorMessage
      }
    });
  }

  public findById(id: number): Observable<ToDoItem> { 
    return this.todoApi.getById(id);
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): Observable<void> {
    return this.todoApi.deleteById(id);
  }

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }

  
}
