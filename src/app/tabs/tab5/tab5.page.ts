import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  user:any
  
  constructor(private storage: StorageService, public modalCtrl: ModalController) { }

  async ngOnInit() {
    let result = await this.storage.getItems('user')
    this.user = await JSON.parse(result.value)
    if(!this.user.name) this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EditUserComponent,
    });
    modal.present();
  }

  async clear(value:string) {
    await this.storage.removeItem(value)
    const defaultUser = {name: 'Иван Иванов', goal: 'Купить дом'}
    this.storage.setItem('user', JSON.stringify(defaultUser))
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 1000);
  }

}
