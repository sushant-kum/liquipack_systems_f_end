import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './apps.component';


const routes: Routes = [
  {
    path: '',
    component: AppsComponent
  },
  {
    path: 'quotation',
    loadChildren: () => import('src/app/pages/apps/quotation/quotation.module').then(module => module.QuotationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
