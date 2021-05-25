import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private storage: StorageService,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              public toastController: ToastController) { }
  
  budgetProgress:any
  createData:boolean = false
  editData:boolean = false
  changeData:boolean = false
  counter:number = 0
  
  goal = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    amount: ['', [Validators.required, Validators.maxLength(15)]],
    goal: ['', [Validators.required, Validators.maxLength(15)]]
  })

  async ngOnInit() {
    let result = await this.storage.getItems('budgetProgress') 
    this.budgetProgress = JSON.parse(result.value)
    if(result.value == '[]') {
      const defaultData = [{
        id: 0,
        title: 'Пример: Дом',
        amount: '1000000',
        goal: '2000000'
      }]
      this.budgetProgress = defaultData
      this.storage.setItem('budgetProgress', JSON.stringify(defaultData))
    }
    console.log(this.budgetProgress)
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 1000);
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Успешно!',
      duration: 1500
    });
    toast.present();
  }
  
  async submit(e) {
    let budgetProgress = await this.storage.getItems('budgetProgress') 
    let budgetData = JSON.parse(budgetProgress.value)
    let data = this.goal.getRawValue()
    let dataID = await this.storage.getItems('budgetID')
    let id = await dataID.value || 0
    data.id = id
    console.log(id)
    await this.storage.setItem('budgetID', String(+id + 1))
    budgetData.unshift(data)
    this.storage.setItem('budgetProgress', JSON.stringify(budgetData))
    this.presentToast()
    this.goal.reset()
    this.ngOnInit()
  }

  // async getColor(data) {
  //   if(data > 89) {
  //     console.log('success')
  //     return 'success'
  //   } else if(data > 49) {
  //     console.log('warning')
  //     return 'warning'
  //   }
  //   console.log('primary')
  //   return 'primary'
  // }

  async editBudget(id) {
    let currentData = JSON.parse((await this.storage.getItems('budgetProgress')).value)
    let newData = await this.goal.getRawValue()
    newData.id = id
    for (let i = 0; i < currentData.length; i++) {
      if(+currentData[i].id == +id) {
        if(newData.title == "" || newData.title == null) {
          newData.title = await currentData[i].title
        }
        if(newData.amount == "" || newData.amount == null) {
          newData.amount = await currentData[i].amount
        }
        if(newData.goal == "" || newData.goal == null) {
          newData.goal = await currentData[i].goal
        }
        currentData[i] = await newData
      }
    }
    await this.storage.setItem('budgetProgress', JSON.stringify(currentData))
    this.budgetProgress = currentData
    this.goal.reset()
    this.changeData = false
  }

  async deleteBudget(id) {
    let data = this.storage.getItems('budgetProgress')
    let filteredData = JSON.parse((await data).value)
    this.budgetProgress = await filteredData.filter(data => +data.id !== +id)
    this.storage.setItem('budgetProgress', JSON.stringify(this.budgetProgress))
  }

  async presentAlertConfirm() {
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
    await this.storage.setItem('budgetProgress', JSON.stringify([]))
    this.budgetProgress = []
  }

}

