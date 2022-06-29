import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PageDynamicComponent } from './page-dynamic.component'
import { PageDynamicRoutingModule } from './page-dynamic-routing.module'
import { LazyLoadModule } from 'src/app/directives/lazy-load/lazy-load.module'

@NgModule({
  declarations: [PageDynamicComponent],
  imports: [
    CommonModule,
    PageDynamicRoutingModule,
    LazyLoadModule,
  ],
})

export class PageDynamicModule {
  static entry = PageDynamicComponent
}
