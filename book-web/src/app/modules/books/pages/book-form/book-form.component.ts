import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../../../core/interfaces/book.interface';
import { BookService } from '../../../../core/services/book/book.service';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    FormsModule, 
    RouterModule, 
    TranslateModule, 
    TranslateConfigModule
  ],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  @ViewChild('bookForm') bookForm!: NgForm;

  protected book: Book;
  protected idBook: any;

  constructor(
    protected bookService: BookService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected toast: ToastrService,
    protected translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.book = {
      title: '',
      author: '',
      editorial: '',
      category: '',
      year: 1900,
      read: false,
    };
  }

  ngOnInit(): void {
    this.idBook = this.route.snapshot.paramMap.get('id');

    if (this.idBook) {
      this.findBook();
    }
  }

  /**
   * Hace la validación de los inputs
   */
  protected invalidInput(inputName: string): boolean {
    return (
      this.bookForm?.controls[inputName]?.invalid &&
      this.bookForm?.controls[inputName]?.touched
    );
  }

  /**
   * Crear libro
   */
  protected saveBook(): void {
    this.bookService.saveBook(this.book).subscribe({
      next: (res) => {
        if (res.id) {
          this.bookForm.resetForm({
            title: '',
            author: '',
            editorial: '',
            category: '',
            year: 1900,
            read: false,
          });
          this.router.navigate(['/', 'libros']);
          this.translate.get('createOk').subscribe((msg: string) => {
            this.toast.success(msg);
          });
        } else {
          this.translate.get(`${res.code}`).subscribe((msg: string) => {
            this.toast.error(msg);
          });
          this.toast.error(res.msg);
        }
      },
      error: () => {
        this.translate.get('err500').subscribe((msg: string) => {
          this.toast.error(msg);
        });
      },
    });
  }

  /**
   * Obtener libro por el id
   */
  protected findBook() {
    this.bookService.findBookById(this.idBook).subscribe({
      next: (res) => {
        if (res.id) {
          this.book = res;
        } else {
          this.router.navigateByUrl('/libros');
          this.translate.get(`${res.code}`).subscribe((msg: string) => {
            this.toast.error(msg);
          });
        }
      },
      error: () => {
        this.translate.get('err500').subscribe((msg: string) => {
          this.toast.error(msg);
        });
      },
    });
  }

  /**
   * Actualizar libro
   */
  protected updateBook() {
    this.bookService.updateBook(this.book).subscribe({
      next: (res) => {
        if (res.id) {
          this.router.navigateByUrl('/libros');
          this.translate.get('updateOk').subscribe((msg: string) => {
            this.toast.success(msg);
          });
        } else {
          this.translate.get(`${res.code}`).subscribe((msg: string) => {
            this.toast.error(msg);
          });
        }
      },
      error: () => {
        this.translate.get('err500').subscribe((msg: string) => {
          this.toast.error(msg);
        });
      },
    });
  }
}
