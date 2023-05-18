import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-user-evolution',
  templateUrl: './user-evolution.component.html',
  styleUrls: ['./user-evolution.component.scss']
})
export class UserEvolutionComponent implements OnInit{

  constructor(private route: ActivatedRoute, private database: DatabaseService, private auth: AuthService) {
    Chart.register(Annotation)
  }

  private newLabel? = 'New label';

  weight: any = [];
  series: any = [];
  reps: any = [];

  labels: any = [];

  loaded: boolean = false;

  exerciseID: string = this.route.snapshot.paramMap.get('exerciseID');
  exerciseName: string;

  ngOnInit(): void {
    this.database.getDataFromUserEntry(this.auth.userID, this.route.snapshot.paramMap.get('exerciseID')).then((data) => {
      data.forEach((element: any) => {
        this.weight.push(element.weight);
        this.series.push(element.series);
        this.reps.push(element.repetitions);
        this.labels.push(new Date(element.date).getDate() + '/' + (new Date(element.date).getMonth() + 1) + '/' + new Date(element.date).getFullYear());
      });
      this.database.getExerciseTitle(this.exerciseID).then((title) => {
        this.exerciseName = title;
        this.loaded = true;
      });
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.series,
        label: 'Series',
        backgroundColor: 'getColor(red)',
        borderColor: 'getColor(red)',
        pointBackgroundColor: '#839192',
        pointBorderColor: '#839192',
        pointHoverBackgroundColor: '#839192',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'false',
      },
      {
        data: this.reps,
        label: 'Repetitions',
        backgroundColor: '#2ECC71',
        borderColor: '#2ECC71',
        pointBackgroundColor: '#839192',
        pointBorderColor: '#839192',
        pointHoverBackgroundColor: '#839192',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'false',
      },
      {
        data: this.weight,
        label: 'Weight',
        yAxisID: 'y1',
        backgroundColor: 'rgb(0,179,230)',
        borderColor: 'rgb(0,179,230)',
        pointBackgroundColor: '#839192',
        pointBorderColor: '#839192',
        pointHoverBackgroundColor: '#839192',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'false',
      },
    ],
    labels: this.labels,

  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x:{
        ticks: {
          color: '#6a69dc'
        }
      },
      y:
        {
          ticks: {
            color: '#6a69dc'
          },
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: '#8c97bf',
        },
        ticks: {
          color: '#6a69dc'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
}
