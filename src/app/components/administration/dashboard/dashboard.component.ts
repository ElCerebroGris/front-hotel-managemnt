import { Component, OnInit } from '@angular/core';
import { ChartOptions2, DataPoint } from 'src/app/models/chartJS';
import { GeneralService } from 'src/app/services/general.service';

interface OriginalItem {
  day: string;
  total: number;
}

interface ConvertedItem {
  label: string;
  y: number;
}

interface ChartOptions {
  title: {
    text: string;
  };
  data: {
    type: string;
    dataPoints: ConvertedItem[];
  }[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sms_by_month = 0;
  sms_by_days = [];

  chartOptions: ChartOptions = {
    title: {
      text: 'SMS por dia',
    },
    data: [
      {
        type: 'column',
        dataPoints: [],
      },
    ],
  };

  chartOptions2: ChartOptions2 = {
    theme: 'light2',
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Reservas por dia',
    },
    axisY: {
      labelFormatter: (e: any) => {
        var suffixes = ['', 'K', 'M', 'B', 'T'];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;

        var suffix = suffixes[order];
        return e.value / Math.pow(1000, order) + suffix;
      },
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'YYYY-MM-DD',
        yValueFormatString: '#####',
        dataPoints: [],
      },
    ],
  };

  loading = true;

  public selectedYear: number;
  public selectedMonth: number;

  public years: number[] = [];
  public months: { value: number; name: string }[] = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' },
  ];

  constructor(private service: GeneralService) {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.selectedMonth = new Date().getMonth() + 1;
    // Populate the years from 2023 to the current year
    for (let year = 2023; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.loading = true;

    this.service
      .getter(
        'statistics/month?year=' +
          this.selectedYear +
          '&month=' +
          this.selectedMonth
      )
      .subscribe(
        (res) => {
          this.sms_by_month = res.total;
        },
        (error) => {
          //this.loading = false;
        }
      );

    this.service
      .getter(
        'statistics/day?year=' +
          this.selectedYear +
          '&month=' +
          this.selectedMonth
      )
      .subscribe(
        (res) => {
          this.sms_by_days = res;
          if (res.length == 0) {
            this.service.callNotification('warn', 'Sem dados disponíveis');
            this.loading = false;
          }
          const convertedData2: DataPoint[] = this.sms_by_days.map(
            (item: OriginalItem) => {
              const [year, month, day] = item.day.split('-').map(Number);
              return { x: new Date(year, month - 1, day), y: item.total };
            }
          );
          this.chartOptions2.data[0].dataPoints = convertedData2;
          this.chartOptions2.title.text =
          'Reservas por dia de: ' + this.selectedMonth + '/' + this.selectedYear;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  onYearMonthChange() {
    // This method is called whenever the year or month changes
    console.log('Selected Year:', this.selectedYear);
    console.log('Selected Month:', this.selectedMonth);
    // You can perform any additional logic or actions here
    this.carregar();
  }

  getResult(): string {
    // Example: You can return a formatted result based on the selected year and month
    return `Result: ${this.selectedYear} - ${this.selectedMonth}`;
  }
}
