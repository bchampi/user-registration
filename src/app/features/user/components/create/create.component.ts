import { Component, Input, OnChanges, SimpleChanges, TemplateRef, effect, inject, input } from '@angular/core'
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { UserDto } from '../../models/user'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { take } from 'rxjs'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  activeModal = inject(NgbActiveModal)
  private userService = inject(UserService)
  private fb = inject(NonNullableFormBuilder)
  responseChanged = this.userService.responseChanged
  
  @Input() userId: number | null = null
  formData = input<UserDto | null>(null)

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required]
  })

  constructor() {
    effect(() => {
    })
  }

  create(userDto: UserDto) {
    this.userService.create(userDto)
      .pipe(take(1))
      .subscribe({
        next: () => this.activeModal.close('ok'),
        error: () => this.userForm.setErrors(null)
      })
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userForm.markAsPending()
      const userDto = this.userForm.value as UserDto
      this.create(userDto)
    }
  }
}
