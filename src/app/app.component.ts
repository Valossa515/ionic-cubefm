import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string  = "HomePage";
  show: boolean = false;

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      {title: 'Carrinho', component: 'CartPage'},
      { title: 'Cadastro de Categorias', component: 'CategoriasCadastroPage'},
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title: string, component: string}) {
    let result=this.storage.getLocalUser().email;
    let roles = this.storage.getLocalUser().roles;
    if(result == 'nelio.iftm@gmail.com'){
        console.log("Ola, bem vindo: ", result, roles);
    }
    switch (page.title){
        case 'Logout':
          this.auth.logout();
          this.nav.setRoot('HomePage');
          break;
        case 'Cadastro de Categorias':
          if(result != 'nelio.iftm@gmail.com'){
            this.showInsertOk();
        }
        default:    
          this.nav.setRoot(page.component);
    }
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Acesso Negado!!!',
      message: 'Desculpe mas você não tem permissão para entrar nesta página, faça login de administrador para ter acesso.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  }
}
