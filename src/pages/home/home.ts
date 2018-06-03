import { DicasPage } from './../dicas/dicas';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import firebase from 'firebase';


import { Users } from './Users';
import { RecuperarPage } from '../recuperar/recuperar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  public user: Users = new Users();

  constructor(public navCtrl: NavController,
              public toast: ToastController,
              public autenticacao: AngularFireAuth) {

  }

  public entrar() :void {

    this.autenticacao.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( data => {
      this.user.email = this.email.value;
      this.user.senha = this.password.value;
      console.log(data);
      
      let mensagem = "Bem vindo " + this.user.email;

      this.navCtrl.setRoot(DicasPage);
      this.exibirToast(mensagem);
  
    })
    .catch( (error: any) => {
      this.exibirToast("Erro de login");
    });

  }

  public registrar(): void {
    this.navCtrl.push(RegistroPage);
  }

  public recuperar(): void {
    this.navCtrl.push(RecuperarPage);
  }

  public entrarComFacebook() {
    this.autenticacao.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider())
    .then(data => {
      console.log(data);
      this.exibirToast(data);
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  public entrarComoVisitante(): void {
    this.autenticacao.auth.signInAnonymously()
      .then(data => {
        console.log('Login anonimo: ', data);
        this.exibirToast('Acesso anônimo.');
      })
      .catch((erro: any) => {
        this.exibirToast('Falha ao acessar como anônimo.');
      });
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toast.create({duration: 3000, position: 'botton'});
    toast.setMessage(mensagem);
    toast.present();
  }
}
