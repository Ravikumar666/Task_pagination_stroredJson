import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent {
  @Input() title: string = '';
  @Input() price: string = '';

  constructor(private dialodRef: MatDialogRef<ModelComponent>) {}

  closeModel() {
    this.dialodRef.close();
  }
}
