import { Component, inject, signal } from '@angular/core';
import { toSignal                                                                                                                      } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';
import LoaderComponent from 'src/app/utils/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash, faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import { NgClass } from '@angular/common';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { User } from './models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LoaderComponent, RouterLink, FontAwesomeModule, NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  private modalService = inject(NgbModal)
  private userService = inject(UserService)

  faPencil = faPencil
  faTrash = faTrash
  faCheckCircle = faCheckCircle
  faEye = faEye

  loading = this.userService.loadingSignal
  responseChanged = this.userService.responseChanged
  userListSignal = toSignal(
    this.responseChanged.pipe(
      switchMap(() => this.userService.get())
    )
    , { initialValue: [] }
  )

  get userList() {
    return this.userListSignal()
  }

  openModal(user: User | null = null) {
    const modalRef = this.modalService.open(CreateEditComponent)
    if (user) {
      const { id, status, ...restOfData } = user
      modalRef.componentInstance.userId = id
      modalRef.componentInstance.formData = signal(restOfData)
      return
    }
	}

  remove(userId: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.delete(userId)
        .subscribe({
          next: () => console.log('ok'),
          error: () => console.log('error')
        })
    }
  }
}
