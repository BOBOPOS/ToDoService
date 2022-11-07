import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  public BASE_URL: string = 'https://localhost:44309/'
  constructor(private http: HttpClient) { }
  
  create(todoItem: ToDoItem): Observable<void> { 
    return this.http.post<void>(`${this.BASE_URL}ToDos`,todoItem)
  }
}
