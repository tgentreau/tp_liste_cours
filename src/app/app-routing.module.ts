import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cours',
    pathMatch: 'full'
  },
  {
    path: 'cours',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    IonicModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
