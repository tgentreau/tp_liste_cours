import { Component } from '@angular/core';
import {AlertController, MenuController, PopoverController} from "@ionic/angular";
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  promptEvent: any = null
  constructor(private popover: PopoverController, private alertController: AlertController) {
    window.addEventListener('beforeinstallprompt', e => {
      this.promptEvent = e
    })
  }

  ngOnInit() {

  }

  onInstall() {
    this.promptEvent.prompt()
  }

  openMenu(myevent: MouseEvent): void {
    this.popover.create({
      component: MenuComponent,
      showBackdrop: true,
      cssClass: "my-menu-class",
      event: myevent,
      componentProps: {
        myprop: 'xxx'
      }
    }).then((popoverElement) => {
      popoverElement.present()
      popoverElement.onDidDismiss().then((res) => {
        console.log(res)
      })
    })
  }

  async openAlert() {
    const message = "le message de l'alerte"
    const alert = await this.alertController.create({
      header: "Erreur",
      message: message,
      buttons: ['OK']
    })
    await alert.present()
    await alert.onDidDismiss()
  }

}
