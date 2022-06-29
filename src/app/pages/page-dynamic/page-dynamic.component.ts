import { Component } from '@angular/core'
@Component({
  template: `
    <ng-template [lazyLoad]="section"></ng-template>
  `,
})
export class PageDynamicComponent {
  section = { type: 'section-header', data: { info: 'test' } }
}
