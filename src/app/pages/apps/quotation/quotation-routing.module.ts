import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationComponent } from './quotation.component';


const routes: Routes = [
  {
    path: '',
    component: QuotationComponent
  },
  {
    path: 'config',
    loadChildren: () => import('src/app/pages/apps/quotation/config/config.module').then(module => module.ConfigModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
