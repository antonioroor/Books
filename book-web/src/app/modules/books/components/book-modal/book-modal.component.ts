import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { BookService } from '../../../../core/services/book/book.service';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [TranslateModule, TranslateConfigModule],
  templateUrl: './book-modal.component.html',
})
export class BookModalComponent {
  @Input() id: string;
  @Output() bookModalEvent = new EventEmitter<string>();

  constructor(
    protected bookService: BookService,
    protected translate: TranslateService,
    protected toast: ToastrService
  ) {
    this.translate.setDefaultLang('es');
    this.id = '';
  }

  /**
   * Eliminar libro
   */
  protected deleteBook(): void {
    this.bookService
      .deleteBookById(this.id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            this.bookModalEvent.emit('bookDeleted');
          } else {
            this.translate.get('error').subscribe((msg: string) => {
              this.toast.error(msg);
            });
          }
        },
        error: () => {
          this.translate.get('error').subscribe((msg: string) => {
            this.toast.error(msg);
          });
        },
      });
  }
}
