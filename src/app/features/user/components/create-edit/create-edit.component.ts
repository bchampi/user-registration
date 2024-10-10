import { Component, Input, effect, inject, input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { UserDto } from '../../models/user'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { take } from 'rxjs'

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-edit.component.html'
})
export class CreateEditComponent {
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
      if (this.formData()) {
        this.userForm.setValue({
          name: this.formData()!.name,
          email: this.formData()!.email,
          gender: this.formData()!.gender
        })
      }
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

  edit(userId: number, userDto: UserDto) {
    this.userService.edit(userId, userDto)
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
      this.userId ? this.edit(this.userId, userDto) : this.create(userDto)
    }
  }
}
