import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPage');
  }

  public enviaEmailRecuperaSenha(): void {

    let toast = this.toastCtrl.create({duration: 3000, position: 'botton'});

    this.afAuth.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(data => {
      toast.setMessage('Solicitação de redefinição de senha enviada para o e-mail ' + this.emailDigitado.value);
      toast.present();
      console.log(data);
    })
    .catch((error: any ) => {
      toast.setMessage('Erro ao redefinir a senha');
      toast.present();
      console.log(error);
    });
  }

}
