import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        loadComponent: () => import('./features/user/user.component')
    },
    {
        path: 'users/:id',
        loadComponent: () => import('./features/user/components/detail/detail.component')
    }
];
