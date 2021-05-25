import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private storage: StorageService,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              public toastController: ToastController) {}

  transactions:any[]
  createTransaction:boolean = false
  editTransaction:boolean = false
  changeTransaction:boolean = false

  async ngOnInit() {
    const data = await this.storage.getItems('transactions')
    this.transactions = JSON.parse(data.value)
  }
  
  async doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 1000);
  }

  async deleteTransactionConfirm(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `Удалить запись ${data.name}`,
      message: `Вы действительно хотите удалить транзакцию: <strong>${data.name}</strong> ?`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Удалить',
          handler: () => {
            this.deleteTransaction(data.date)
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteTransaction(date) {
    let data = JSON.parse((await this.storage.getItems('transactions')).value)
    data = data.filter(e => e.date != date)
    this.transactions = await data
    await this.storage.setItem('transactions', JSON.stringify(data))
  }

  async clearAllDataConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Очистка данных',
      message: 'Вы уверены что хотите удалить все данные?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Удалить',
          handler: () => {
            this.clear()
          }
        }
      ]
    });

    await alert.present();
  }

  async clear() {
    await this.storage.setItem('transactions', JSON.stringify([]))
    this.transactions = []
  }

}
