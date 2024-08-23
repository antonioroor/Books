import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import * as XLSX from 'xlsx';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../../core/services/book/book.service';
import { Book } from '../../../../core/interfaces/book.interface';
import { BookModalComponent } from '../../components/book-modal/book-modal.component';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbPaginationModule,
    TranslateModule,
    TranslateConfigModule,
    BookModalComponent,
  ],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  protected books: Book[];
  protected booksToShow: Book[];
  protected page: number;
  protected pageSize: number;
  protected showModal: boolean;
  protected idBook: any;
  protected printBooks: Boolean;
  protected filterBooks: string;

  constructor(
    protected bookService: BookService,
    protected translate: TranslateService,
    protected toast: ToastrService
  ) {
    this.translate.setDefaultLang('es');
    this.showModal = false;
    this.books = [];
    this.booksToShow = [];
    this.page = 1;
    this.pageSize = 5;
    this.idBook = 0;
    this.printBooks = false;
    this.filterBooks = '';
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  /**
   * Obtiene la lista de libros
   */
  public findAllBooks(): void {
    this.bookService
      .findAllBooks()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            this.books = res;
            this.booksToShow = res;
          }
        },
        error: () => {
          this.translate.get('error').subscribe((msg: string) => {
            this.toast.error(msg);
          });
        },
      });
  }

  /**
   * Settea el id del libro a eliminar
   */
  protected setIdBookToDelete(idBook: any) {
    this.idBook = idBook;
  }

  /**
   * Recarga la tabla tras la eliminación de un registro
   */
  protected reloadTable(event: string) {
    if (event === 'bookDeleted') {
      this.translate.get('deleteOk').subscribe((msg: string) => {
        this.toast.success(msg);
      });
      this.findAllBooks();
    }
  }

  /**
   * Método que hace la exportación a excel de la tabla
   */
  protected exportExcel() {
    let Heading = [
      ['Título', 'Autor', 'Editorial', 'Categoría', 'Publicación', 'Leído'],
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.books);
    XLSX.utils.sheet_add_aoa(ws, Heading);
    // Generación del workbook y del worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    // Guardado del archivo
    XLSX.writeFile(workbook, `Libros.xlsx`);
  }

  /**
   * Filtra la lista de libros
   */
  protected handleFilterTitle() {
    this.booksToShow = this.books.filter(
      (book) =>
        book.title.indexOf(this.filterBooks) !== -1 ||
        book.author.indexOf(this.filterBooks) !== -1 ||
        book.category.indexOf(this.filterBooks) !== -1 ||
        book.editorial.indexOf(this.filterBooks) !== -1
    );
  }
}
