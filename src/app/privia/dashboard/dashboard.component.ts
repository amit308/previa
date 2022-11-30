import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'name', 'email', 'date','Visit_time','number','doctor','condition'];
  dataSource:any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  chartOption: EChartOption = {
    title: {
      text: 'Hospital survey'
  },
    legend: {
      data: ['patients']
  },
    xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
        type: 'category',
        data: ['Mon Top', 'Tue Top', 'Wed Top', 'Thu Top', 
        'Fri Top', 'Sat Top', 'Sun Top']
    }],
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        name:'patients'
    }
  ]
};

areaChart:EChartOption =  {
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth:true,
      color:'red',
      areaStyle: {}
  }]
};

areaChartBlue:EChartOption =  {
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth:true,
      color:'#8181ef',
      areaStyle: {}
  }]
};

pieChart:EChartOption = {


  title: {
      text: 'Departments',
      left: 'center',
      top: 20,
      textStyle: {
          color: '#ccc'
      }
  },

  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
          colorLightness: [0, 1]
      }
  },
  series: [
      {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
              {value: 335, name: 'Gynacology'},
              {value: 310, name: 'pulmonology'},
              {value: 274, name: 'Cardiology'},
              {value: 235, name: 'Dentistry'},
              {value: 400, name: 'Laboratory'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
              color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
              lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
          },
          itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
               normal : {
                       label : {
                                 show : false
                                },
                       labelLine : {
                                     show : false
                                    }
                       }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
              return Math.random() * 200;
          }
      }
  ]
};

  constructor(private spinner:NgxSpinnerService) { this.spinner.hide() }

  ngOnInit(): void {
    let data = [
      {photo:'',name:'Liam',email:'liam@gmail.com',date:'18 Dec 2018',Visit_time:'10:15 - 10:30',number:'0126596578',doctor:'Dr. Sophie',condition:'allergy'}
     
    ];
    this.dataSource = new MatTableDataSource<any>(data);
  }

}
