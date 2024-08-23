import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'libros',
    loadComponent: () => import('./modules/books/pages/books/books.component').then(c => c.BooksComponent)
  },
  {
    path: 'editar-libro/:id',
    loadComponent: () => import('./modules/books/pages/book-form/book-form.component').then(c => c.BookFormComponent)
  },
  {
    path: 'nuevo-libro',
    loadComponent: () => import('./modules/books/pages/book-form/book-form.component').then(c => c.BookFormComponent)
  },
  {
    path: '',
    redirectTo: '/libros',
    pathMatch: 'full'
  }
];
