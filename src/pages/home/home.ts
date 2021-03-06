import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { isTrueProperty } from 'ionic-angular/umd/util/util';
import { TreeError } from '@angular/compiler';
import { MyApp } from '../../app/app.component';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cred : CredenciaisDTO ={
    email : "",
    senha : ""
  }
  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public hide: MyApp) {

  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }
  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response=>{
         this.auth.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
      },
        error => {});
  }  

  login()
  {
    this.auth.authenticated(this.cred)
      .subscribe(response=>{
         this.auth.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
      },
        error => {});
  }
  signup()
  {
    this.navCtrl.push('SignupPage');
  }
}
