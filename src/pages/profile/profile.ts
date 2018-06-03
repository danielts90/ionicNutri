import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public email: string;
  public fotoPerfil: boolean;

  facebook = {
    nome: '',
    foto: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth, 
              public toastCtrl: ToastController) {
    this.email = this.afAuth.auth.currentUser.email;
    this.facebook.nome = afAuth.auth.currentUser.displayName;
    this.facebook.foto = afAuth.auth.currentUser.photoURL;

    if( this.facebook.foto === null ) {
      this.fotoPerfil = false;
    } else {
      this.fotoPerfil = true;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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

}
