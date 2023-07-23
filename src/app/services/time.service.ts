import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeSeriesMonthly } from '../models/data.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TimeService {

  constructor(private http: HttpClient) { }

  getTimeSeriesMonthly(): Observable<{ name: string, series: { name: string, value: number }[] }[]> {
    return this.http.get<TimeSeriesMonthly>(environment.alphaVantageBaseUrl,
      {
        headers: new HttpHeaders()
          .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
          .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
        params: new HttpParams()
          .set('symbol', 'MSFT')
          .set('function', 'TIME_SERIES_MONTHLY')
          .set('datatype', 'json'),
      }).pipe(
        map((data: TimeSeriesMonthly) => {
          const timeSeries = data['Monthly Time Series'];

          let chartData = [{
            "name": "open",
            "series": []
          },
          {
            "name": "high",
            "series": []
          },
          {
            "name": "low",
            "series": []
          },
          {
            "name": "close",
            "series": []
          }
          ];

          for (const key in timeSeries) {

            chartData[0].series.push({
              name: key,
              value: Number(timeSeries[key]['1. open'])
            });
            chartData[1].series.push({
              name: key,
              value: Number(timeSeries[key]['2. high'])
            });
            chartData[2].series.push({
              name: key,
              value: Number(timeSeries[key]['3. low'])
            });
            chartData[3].series.push({
              name: key,
              value: Number(timeSeries[key]['4. close'])
            });
          }

          return chartData.sort((a, b) => (b.series["name"]) - (a.series["name"]));

        })
      );
  }
}

