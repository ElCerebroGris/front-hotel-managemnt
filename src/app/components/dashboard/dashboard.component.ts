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
  total_reservas = 0;
  montante_faturado = 0;

  loading = true;

  constructor(private service: GeneralService) {
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.loading = true;

    this.service.getter('reservas/estatisticas?periodo=ano').subscribe(
      (res) => {
        this.total_reservas = res.periodos ? res.periodos[0].total_reservas : 0;
        this.montante_faturado = res.periodos ? res.periodos[0].montante_faturado : 0;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
