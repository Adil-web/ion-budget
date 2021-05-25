import { StorageService } from './../../../services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private storage: StorageService,
              public toastController: ToastController) { }

  user = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    goal: ['', [Validators.required]]
  })

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Запись успешно добавлено!',
      duration: 1500
    });
    toast.present();
  }

  async submit(e) {
    e.preventDefault()
    await this.storage.setItem('user', JSON.stringify(this.user.getRawValue()))
    this.presentToast()
    this.user.reset()
  }

}
