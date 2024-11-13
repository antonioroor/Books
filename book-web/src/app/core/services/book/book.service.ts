import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Book } from '../../interfaces/book.interface';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = environment.url;
  // private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) {}

  /**
   * Lista de libros
   */
   public findAllBooks(): Observable<Book[]> { // { headers: this.httpHeaders }
    return this.http.get<Book[]>(`${this.url}`).pipe(
      catchError((e) => of(e.error)));
  }

  /**
   * Obtener libro por el id
   * @param id del libro
   */
  public findBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`).pipe(
      catchError((e) => of(e.error)));
  }

  /**
   * Crear libro
   * @param book libro a guardar
   */
  public saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.url}`, book).pipe(
      catchError((e) => of(e.error)));
  }

  /**
   * Actualizar libro
   * @param book libro a actualizar
   */
  public updateBook(book: Book): Observable<Book> { 
    return this.http.put<Book>(`${this.url}/${book.id}`, book).pipe(
      catchError((e) => of(e.error)));
  }

  /**
   * Eliminar libro
   * @param id del libro a eliminar
   */
  public deleteBookById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((e) => of(e.error)));
  }


}
