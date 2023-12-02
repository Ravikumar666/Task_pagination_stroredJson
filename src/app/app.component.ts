import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from './model/model.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'progress',
    'category',
    'price',
    'discountPercentage',
    'rating',
    'stock',
    'description',
    'action',
  ];
  datasource: any[] = [];
  form!: FormGroup;
  cities: any = ['Bangalore', 'Hyderabad', 'Vizag', 'Chennai'];
  states: any = {
    Bangalore: ['Karnataka', 'Kerala', 'Andra Pradesh', 'Telangana', 'Chennai'],
    Hyderabad: ['Karnataka', 'Kerala', 'Andra Pradesh', 'Telangana', 'Chennai'],
    Vizag: ['Karnataka', 'Kerala', 'Andra Pradesh', 'Telangana', 'Chennai'],
    Chennai: ['Karnataka', 'Kerala', 'Andra Pradesh', 'Telangana', 'Chennai'],
  };

  selectedCity: string = '';
  selectedState: string = '';
  disableBtn: boolean = false;

  chart: any;
  countries = ['Country A', 'Country B', 'Country C', 'Country D'];
  populations = [150, 200, 120, 180];

  constructor(
    private http: HttpClient,
    private dailog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
      this.datasource.push(Object.values(data)[0]);
    });
    this.form = this.fb.group({
      numberField: [
        '',
        [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)],
      ],
      cityDropdown: ['', Validators.required],
      stateDropdown: ['', Validators.required],
    });

    this.FormCityDropdown.valueChanges.subscribe((city: any) => {
      this.selectedCity = city;
      this.FormStateDropdown.setValue('');
    });

    // this.createBarChart();
  }

  get FormNumber(): AbstractControl | any {
    return this.form.get('numberField');
  }

  get FormCityDropdown(): AbstractControl | any {
    return this.form.get('cityDropdown');
  }

  get FormStateDropdown(): AbstractControl | any {
    return this.form.get('stateDropdown');
  }

  onSubmit(): any | undefined {
    if (this.form.valid) {
      console.log('Number:', this.FormNumber.value);
      console.log('City:', this.FormCityDropdown.value);
      console.log('State:', this.FormStateDropdown.value);
      alert('Form submitted successfully');
    }
  }

  exportToCSV() {
    const csvData = this.convertToCsv(this.datasource);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yourCSVfile.csv';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  convertToCsv(data: any[]): string {
    let header: any = [];
    let rows: any = [];
    data.map((item: any) => {
      const [headerin] = item;
      header.push(Object.keys(headerin).join(','));
      rows.push(
        item.map((obj: any) => Object.values(obj).join(',').split('\n'))
      );
    });
    return `${header}\n${rows[0].join('\n')}`;
  }

  openDetailsDialog(title: string, price: string) {
    const dailogRef = this.dailog.open(ModelComponent, {
      width: '100%',
      maxWidth: '550px',
    });
    dailogRef.componentInstance.title = title;
    dailogRef.componentInstance.price = price;
  }

  createBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement | null;

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.countries,
          datasets: [
            {
              label: 'Population (in lacs)',
              data: this.populations,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Canvas element not found!');
    }
  }
}
