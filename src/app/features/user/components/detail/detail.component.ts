import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html'
})
export default class DetailComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  userService = inject(UserService)
  user = toSignal<User | null>(this.route.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.userService.getById(id))
  ))

  constructor() {
    effect(() => {
      if (this.user() === null) this.router.navigate(['/users'])
    })
  }
}
