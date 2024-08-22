import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { take, takeUntil } from 'rxjs/operators';
import { ProductDetail, Products } from 'app/models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  searchId: string;
  searchIdResult: ProductDetail;
  searchPhrase: string;
  searchPhraseResults: ProductDetail[] = [];

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getProductById(): void {
    this.searchIdResult = null;

    if (this.searchId.trim() == '') return;

    this.productsService.getProductById(this.searchId)
      .pipe(take(1))
      .subscribe(
        (response: ProductDetail) => {
          this.searchIdResult = response;
        }
      );
  }

  clearIdSearch(): void {
    this.searchId = '';
    this.searchIdResult = null;
  }

  getProductByPhrase(): void {
    this.searchPhraseResults = [];

    if (this.searchPhrase.trim() == '') return;

    this.productsService.getProductsByPhrase(this.searchPhrase)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (response: Products) => {
          this.searchPhraseResults = response.products;
        }
      );
  }

  clearPhraseSearch(): void {
    this.searchPhrase = '';
    this.searchPhraseResults = [];
  }

  get searchPhraseHasRecords(): boolean {
    return this.searchPhraseResults && this.searchPhraseResults.length > 0;
  }
}
