import { Component, computed, Injector, Signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Playground } from '@ngneers/data';
import { Center, LeafletComponent, Marker } from '@ngneers/leaflet';
import { LocationService, PlaygroundStore } from '@ngneers/service';
import { EditPlaygroundModalComponent } from './edit-playground/edit-playground-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component.js';

@Component({
  standalone: true,
  imports: [SidebarComponent, LeafletComponent, FooterComponent],
  selector: 'ngneers-root',
  template: `
  <main class="vw-100 vh-100">
    <leaflet-map [center]="center()" [markers]="markers()"/>
  </main>
  <ngneers-sidebar
    [playgrounds]="playgrounds()"
    (edit)="edit($event)"
    (selected)="setPlayground($event)" />
    @if(playground()) {
      <ngneers-footer [playground]="playground()"/>
  }`,
})
export class AppComponent {
  playgrounds: Signal<Playground[]>;
  playground = this.store.playground;
  center: Signal<Center>;
  markers: Signal<Marker[] | undefined>;

  constructor(
    private store: PlaygroundStore,
    private modal: NgbModal,
    private injector: Injector,
    private locationService: LocationService,
  ) {
    this.store.loadPlaygrounds();

    this.markers = computed(() => {
      const playground = this.store.playground();
      return [
        this.locationService.location(),
        playground ? ({ ...playground.position, message: playground.name }) : undefined,
      ];
    });

    const getDistance = locationService.getDistance;
    this.playgrounds = computed(() => {
      const location = this.locationService.location();
      return location
        ? this.store.playgrounds().sort((a: Playground, b: Playground) => getDistance(a.position, location) - getDistance(b.position, location))
        : this.store.playgrounds();
    });
    this.center = computed(() => locationService.location() ?? { lat: 56.360029, lng: 10.746635 });
  }

  edit(playground: Playground) {
    this.setPlayground(playground);
    this.modal.open(EditPlaygroundModalComponent, { injector: this.injector });
  }

  setPlayground({ id }: Playground) {
    this.store.selectedId(id);
  }
}
