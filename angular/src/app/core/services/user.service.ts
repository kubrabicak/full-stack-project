import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<{ message: string; data: User[] }>(this.apiUrl).pipe(
      map((response) => response.data)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<{ message: string; data: User }>(this.apiUrl, user)
      .pipe(map((response) => response.data));
  }

  updateUser(user: User): Observable<void> {
    return this.http
      .put<{ message: string; data: void }>(`${this.apiUrl}/${user.id}`, user)
      .pipe(map(() => {}));
  }

  deleteUser(userId: number): Observable<void> {
    return this.http
      .delete<{ message: string; data: void }>(`${this.apiUrl}/${userId}`)
      .pipe(map(() => {}));
  }
}

