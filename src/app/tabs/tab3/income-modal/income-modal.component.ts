import { StorageService } from './../../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.scss'],
})
export class IncomeModalComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private storage: StorageService,
              public toastController: ToastController) { }

  transactions
  
  incomeData = this.formBuilder.group({
    type: ['trending-up', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    amount: ['', [Validators.required, Validators.maxLength(10)]],
    date: ['', [Validators.required]],
  })

  async ngOnInit() {
    const data = await this.storage.getItems('transactions')
    this.transactions = JSON.parse(data.value) || []
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Успешно! Свайпните вниз чтобы обновить!',
      duration: 2000
    });
    toast.present();
  }

  async submit() {
    this.transactions.unshift(this.incomeData.getRawValue())
    this.storage.setItem('transactions', JSON.stringify(this.transactions))
    this.incomeData.reset()
    this.presentToast()
    this.dismiss()
  }

}
