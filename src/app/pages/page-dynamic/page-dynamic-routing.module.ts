import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageDynamicComponent } from './page-dynamic.component'

const routes: Routes = [
  {
    path: '',
    component: PageDynamicComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDynamicRoutingModule { }
