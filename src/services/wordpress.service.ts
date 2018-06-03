import { WORDPRESS_REST_API_URL } from './../config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../config';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WordpressService {
    constructor( public http: Http) {

    }

    public obterPostagensRecentes(page: number = 1) {
        return this.http.get(WORDPRESS_REST_API_URL + 'posts?pages=' + page)
        .map(res => res.json());
    }

    public obterAutor(autor: string) { 
        return this.http.get(WORDPRESS_REST_API_URL + 'users/' + autor)
                   .map(res => res.json());
    }

    public obterCategorias(post) {
        let observableBatch = [];

        post.categories.forEach(categories => {
            observableBatch.push(this.obterCategoria(categories))
        });

        return Observable.forkJoin(observableBatch);
    }

    public obterCategoria(categoria: string) {
        return this.http.get(WORDPRESS_REST_API_URL + 'categories/' + categoria )
                        .map(res => res.json());
    }
}