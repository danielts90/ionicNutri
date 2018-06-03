import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { WordpressService } from './../../services/wordpress.service';
import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  public posts: Array<any> = new Array<any>();
  public novasPaginas: boolean = true;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth, 
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public servico: WordpressService ) {
  }

  ionViewWillEnter(){
    this.novasPaginas = true;

    if (!(this.posts.length > 0)) {
      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
      loading.present();
      this.servico.obterPostagensRecentes().subscribe(data => {
        console.log(data.json);
        
        for(let post of data){
          console.log(post);
          
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<p>';
          this.posts.push(post);
        }
      });
      loading.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  public sair(): void {

    let toast = this.toastCtrl.create({duration: 3000, position: 'botton'});
    let mensagem;
    this.afAuth.auth.signOut()
    .then(data => {
        mensagem = 'Logout efetuado com sucesso.';
        toast.setMessage(mensagem);
        toast.present();
    
    })
    .catch((error: any) => {
      mensagem = 'Falha ao efetuar o logout.';
      toast.setMessage(mensagem);
      toast.present();
    });
  }

  public postClicado(event: Event, post) {
    console.log('Post clicado',post);
    
    this.navCtrl.push(PostPage, {
      item: post
    })
  }

  public doInfinite(infinityScroll): void {
    let page = (Math.ceil(this.posts.length/10) + 1);
    let carregando = true;
    
    this.servico.obterPostagensRecentes(page)
    .subscribe(data => {
      for(let post of data ){
        if (!carregando) {
          infinityScroll.complete();
        }
        this.posts.push(post);
        carregando = false;
      }
    }, err => {
      this.novasPaginas = false;
      console.log('entrou no erro');
      
      infinityScroll.complete();
    });
  }

  public doRefresh(refresher): void {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  // public exibirLoading(): void {
  //   this.loadingCtrl.create().present();
  // }

  // public fecharLoadind(): void {
  //   this.loadingCtrl.create().dismiss();
  // }
}
