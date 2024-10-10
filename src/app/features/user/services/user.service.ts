import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User, UserDto } from '../models/user';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  loadingSignal = signal(false)
  responseChanged = new BehaviorSubject<void>(undefined)

  get() {
    this.loadingSignal.set(true)
    return this.http.get<User[]>(`${apiUrl}/v2/users`)
      .pipe(
        catchError((_err) => {
          alert('Error')
          this.loadingSignal.set(false)
          return of([])
        }),
        tap((_users) => this.loadingSignal.set(false))
      )
  }

  create(user: UserDto) {
    return this.http.post<User>(`${apiUrl}/v2/users`, user)
      .pipe(tap(() => this.responseChanged.next()))
  }

  edit(userId: number, user: UserDto) {
    return this.http.put<User>(`${apiUrl}/v2/users/${userId}`, user)
      .pipe(tap(() => this.responseChanged.next()))
  }

  delete(userId: number) {
    return this.http.delete<User>(`${apiUrl}/v2/users/${userId}`)
      .pipe(tap(() => this.responseChanged.next()))
  }
}
