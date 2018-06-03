import { DicasPage } from './../dicas/dicas';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public autenticacao: AngularFireAuth,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  public registrar() : void {

    let toast = this.toastCtrl.create({duration: 3000, position:'top'});
    
    this.autenticacao.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log(data);
      toast.setMessage("Usuário criado com sucesso!");
      toast.present();
      this.navCtrl.setRoot(DicasPage);

    })
    .catch((error: any) => {
      let mensagem: string;
      console.log(error);
      if (error.code == 'auth/email-already-in-use') {
        mensagem = "Erro ao cadastrar o usuário!";  
      } else {
        mensagem = error;
      }

      toast.setMessage(mensagem);
      toast.present();

    });
  }

}
