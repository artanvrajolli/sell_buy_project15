import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

    async getProducts(){
        let data:any = await this.http.get('http://localhost:3000/products').toPromise()

        return data.payload
    }
    async getCategories(){
        let data:any = await this.http.get('http://localhost:3000/categories').toPromise()

        return data.payload
    }
}