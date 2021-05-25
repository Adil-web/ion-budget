import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IncomeModalComponent } from "./income-modal/income-modal.component";
import { ExpenseModalComponent } from "./expense-modal/expense-modal.component";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public modalCtrl: ModalController) {}

  async incomeModal() {
    const income = this.modalCtrl.create({
      component: IncomeModalComponent,
    })
    return (await income).present()
  }
  
  async expenseModal() {
    const expense = this.modalCtrl.create({
      component: ExpenseModalComponent,
    })
    return (await expense).present()
  }
  
}
