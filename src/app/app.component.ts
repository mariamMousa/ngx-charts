import { TimeSeriesMonthly } from './models/data.model';
import { TimeService } from './services/time.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private TimeService: TimeService) { }
  chartData: { name: string, series: { name: string, value: number }[] }[] = [];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5']
  };
  ngOnInit(): void {
    this.TimeService.getTimeSeriesMonthly()
      .subscribe(
        data =>{
          this.chartData = data;
          console.log(this.chartData);
        }
      );
  }

  view: any[] = [700, 400];

  // ngx-charts options
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Price';
  showXAxis = true;
  showYAxis = true;


  // TimeSeriesMonthly :any;
  yAxis: boolean = true;
  xAxis: boolean = true;

  showGridLines: boolean = true;

  animations: boolean = true;



  xAxisTicks: any[];
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000]



  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }
}



