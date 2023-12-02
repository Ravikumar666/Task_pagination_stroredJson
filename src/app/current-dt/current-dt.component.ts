import { Component } from '@angular/core';

@Component({
  selector: 'app-current-dt',
  templateUrl: './current-dt.component.html',
  styleUrls: ['./current-dt.component.scss'],
})
export class CurrentDTComponent {
  currentDateTime: string = '';
  constructor() {}
  ngOnInit(): void {
    this.updateDateTime();

    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime(): void {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toLocaleString();
  }
}
