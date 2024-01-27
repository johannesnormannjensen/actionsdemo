import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Playground } from '@ngneers/data';

@Component({
  selector: 'ngneers-footer',
  standalone: true,
  template: `
  @if(playground) {
    <footer>
      <h3>{{playground.name}}</h3>
      <p>{{playground.addressDescription}}</p>
      <p>{{playground.description}}</p>
    </footer>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  @Input() playground?: Playground;
}
