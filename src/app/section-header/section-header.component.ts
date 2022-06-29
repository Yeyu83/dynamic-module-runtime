import {
  ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation,
} from '@angular/core'

@Component({
  selector: 'section-header',
  template: `
    <h1>Header</h1>
    <pre>{{ data | json }}</pre>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent implements OnInit {
  public readonly data!: { type: string; info: string }

  ngOnInit(): void {
    console.log(this.data)
  }
}
