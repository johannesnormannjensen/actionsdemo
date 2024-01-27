import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DefaultDescriptionPipe, DistancePipe } from '../pipe';
import { Playground } from '@ngneers/data';
import { LocationService } from '@ngneers/service';

@Component({
  selector: 'ngneers-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [AsyncPipe, FontAwesomeModule, DefaultDescriptionPipe, DistancePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  @Input() playgrounds: Playground[] | null = [];
  @Output() selected = new EventEmitter<Playground>();
  @Output() edit = new EventEmitter<Playground>();
  location = inject(LocationService).location;
  selectedPlayground?: Playground;

  selectPlayground(playground: Playground) {
    this.selectedPlayground = playground;
    this.selected.emit(playground);
  }
}
