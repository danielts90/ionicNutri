import { ProfilePage } from './../profile/profile';
import { DicasPage } from './../dicas/dicas';

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  DicasPage = DicasPage;
  ProfilePage = ProfilePage;

}