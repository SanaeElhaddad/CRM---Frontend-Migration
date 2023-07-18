import { AuthenticationService } from '../../../shared/services/api/authentication.service';
import { Component, AfterViewInit, OnInit, DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NotificationService } from './../../../shared/services/api/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',

})
export class AppHeaderComponent implements OnInit {

  user :string ;
  notificationSize: number ;
  notificationReceptionSize: number ;
  notificationExpeditionSize: number ;
  notificationProductionSize: number ;

  constructor(
        private notificationService : NotificationService,
        private auth: AuthenticationService,
        private translate: TranslateService,
        private messageService: MessageService

  ) {}




  ngOnInit() {
    this.loadData();
    this.user=this.auth.getCurrentUser().usrCode;
    console.log( this.user);
 
 
 
     this.translate.addLangs([
      'en',
      'fr'
    ]);
    this.translate.setDefaultLang('fr');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|fr/)
        ? browserLang
        : 'fr'
    );
  }
  loadData(search: string = '') {

    this.notificationService.sizeSearch(search).subscribe(
      data => {
        this.notificationSize = data;
      }
    );


    this.notificationService.sizeSearch('notificationType.id:2').subscribe(
      data => {
        this.notificationReceptionSize = data;
        console.log("recep");
        
        console.log( this.notificationReceptionSize);
        
      }
    );
  
    this.notificationService.sizeSearch('notificationType.id:1').subscribe(
      data => {
        this.notificationExpeditionSize = data;
      }
    );

    this.notificationService.sizeSearch('notificationType.id:3').subscribe(
      data => {
        this.notificationProductionSize = data;
      }
    );

    
  }


  changeLang(language: string) {
   // console.log(language);
    this.translate.use(language);
    
  }

  logout() {
    this.auth.logout();
  }






}
