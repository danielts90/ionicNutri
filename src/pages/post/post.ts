
import { WordpressService } from './../../services/wordpress.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  public post: any;
  public user: string;
  public categories: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service: WordpressService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad(){ 
    let loading = this.loadingCtrl.create();
    loading.present();
    
    this.post = this.navParams.get('item');
    console.log('entrou na view posts', this.post);
  
    
    loading.dismiss();
    Observable.forkJoin(
      this.getAuthorData(),
      this.getCategorias())
      .subscribe( data => {
        this.user = data[0].name;
        console.log(this.user);
        
        this.categories = data[1];
        loading.dismiss();
      });
  }

  public getAuthorData() {
    return this.service.obterAutor(this.post.author);
  }

  public getCategorias() {
    return this.service.obterCategorias(this.post);
  }


}
