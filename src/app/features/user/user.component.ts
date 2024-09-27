import { Component, inject } from '@angular/core';
import { toSignal                                                                                                                      } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';
import LoaderComponent from 'src/app/utils/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LoaderComponent, FontAwesomeModule, NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  userService = inject(UserService)
  faPencil = faPencil
  faTrash = faTrash
  faCheckCircle = faCheckCircle

  loading = this.userService.loadingSignal
  userListSignal = toSignal(this.userService.getUsers(), { initialValue: [] })

  get userList() {
    return this.userListSignal()
  }
}
