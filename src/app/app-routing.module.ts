import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/pages/login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/pages/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('src/app/pages/settings/settings.module').then(module => module.SettingsModule)
  },
  {
    path: 'system',
    loadChildren: () => import('src/app/pages/system/system.module').then(module => module.SystemModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('src/app/pages/apps/apps.module').then(module => module.AppsModule)
  },
  {
    path: 'developer',
    loadChildren: () => import('src/app/pages/developer/developer.module').then(module => module.DeveloperModule)
  },
  {
    path: 'error',
    loadChildren: () => import('src/app/errors/errors.module').then(module => module.ErrorsModule)
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
