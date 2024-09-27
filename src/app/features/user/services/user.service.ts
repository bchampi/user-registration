import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user';
import { environment } from '@env/environment';
import { catchError, map, tap,  } from 'rxjs/operators';
import { of } from 'rxjs';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  loadingSignal = signal(false)

  getUsers() {
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
}
