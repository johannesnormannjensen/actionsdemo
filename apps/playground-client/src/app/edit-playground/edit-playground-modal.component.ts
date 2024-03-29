import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Playground } from '@ngneers/data';
import { PlaygroundStore } from '@ngneers/service';
import { EditPlaygroundControlComponent } from './edit-playground-control.component';

@Component({
  selector: 'ngneers-edit-playground-modal',
  standalone: true,
  imports: [ReactiveFormsModule, EditPlaygroundControlComponent],
  template: `
    <div>
      <div class="modal-header">
        <h5 class="modal-title">{{playground?.name}}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <ngneers-edit-playground-control [formControl]="editControl"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss()">Luk</button>
        <button type="button" [disabled]="editControl.invalid" class="btn btn-primary" (click)="save()">OK</button>
      </div>
    </div>
  `,
})
export class EditPlaygroundModalComponent implements OnInit {

  private validateUniqueName = (control: AbstractControl): null | ValidationErrors =>
    this.store.playgrounds().some(p => p.name === control.value?.name && p.id !== this.playground?.id) ? { nonUnique: true } : null;

  editControl = new FormControl<Playground | null>(null, this.validateUniqueName);
  playground?: Playground;

  constructor(public modal: NgbActiveModal, private store: PlaygroundStore) { }

  ngOnInit(): void {
    this.playground = this.store.playground();
    this.editControl.reset(this.playground);
  }

  save() {
    if (this.editControl.valid) {
      this.store.updatePlayground({ ...this.playground, ...this.editControl.value });
      this.modal.close();
    }
  }

}
