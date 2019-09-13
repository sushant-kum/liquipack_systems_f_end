import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationConfigComponent } from './quotation-config.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationConfigRoutingModule {}
