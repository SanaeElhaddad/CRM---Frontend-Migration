
import { DataTableComponent } from './../../shared/components/data-table/data-table.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { FrequencyTypeComponent } from './frequencyType/frequencyType.component';


const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'frequency-type', component: FrequencyTypeComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
