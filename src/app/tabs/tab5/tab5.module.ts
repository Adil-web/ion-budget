import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Tab5PageRoutingModule
  ],
  declarations: [Tab5Page, SettingsComponent, AboutComponent, WidgetsComponent, EditUserComponent]
})
export class Tab5PageModule {}
