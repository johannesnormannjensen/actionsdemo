import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from '@ngneers/data';
import { LocationService } from '@ngneers/service';

@Pipe({
  name: 'distance',
  standalone: true,
})

export class DistancePipe implements PipeTransform {

  constructor(private service: LocationService) {
  }

  transform(value: Coordinate, location: Coordinate | undefined): `${number}m` | 'Ukendt lokation' {
    return location ? `${this.service.getDistance(value, location)}m` : 'Ukendt lokation';
  }
}
