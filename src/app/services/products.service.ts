import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetail, Products } from 'app/models/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  baseUrl: string = 'https://dummyjson.com/products';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductById(id: string): Observable<ProductDetail> {
    return this.httpClient.get<ProductDetail>(`${this.baseUrl}/${id}`);
  }

  getProductsByPhrase(value: string): Observable<Products> {
    return this.httpClient.get<Products>(`${this.baseUrl}/search?q=${value}`);
  }
}
