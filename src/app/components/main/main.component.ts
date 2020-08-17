import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) { }
  limit: number;
  launchYear: number;
  launchSuccess: boolean;
  landSuccess: boolean;
  selectedYear: number;
  selectedLaunch: boolean;
  selectedLanding: boolean;
  conditions: boolean[] = [true, false];
  programs: any[];
  years: number[] = [
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020
  ];
  params: any;
  loading: boolean;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params ', params);
      this.params = {...params};
      // on change call api;
      // set default filters from params if any
      if (this.params.hasOwnProperty('launch_year')) {
        this.selectedYear = parseInt(this.params.launch_year);
        console.log('selected year ', this.selectedYear);
      }
      if (this.params.hasOwnProperty('launch_success')) {
        const condition = (this.params.launch_success === "true");
        this.selectedLaunch = condition;
      }
      if (this.params.hasOwnProperty('land_success')) {
        const condition = (this.params.land_success === "true");
        this.selectedLanding = condition;
      }
      this.getData(params);
    });
  }

  getData(params: any) {
    this.loading = true;
    this.dataService.getRecords(params).subscribe(res => {
      console.log('res', res);
      this.programs = res;
      this.loading = false;
    });
  }

  yearFilter(year: number) {
    if (this.selectedYear === year) {
      delete this.params.launch_year;
      this.selectedYear = null;
    }
    else {
      this.selectedYear = year;
      this.params.launch_year = year;
    }
    this.router.navigate(['launches'], { queryParams: this.params});
  }

  launchFilter(condition) {
    if (this.selectedLaunch === condition) {
      delete this.params.launch_success;
      this.selectedLaunch = null;
    }
    else {
      this.selectedLaunch = condition;
      this.params.launch_success = condition;
    }
    this.router.navigate(['launches'], { queryParams: this.params});
  }

  landingFilter(condition) {
    if (this.selectedLanding === condition) {
      delete this.params.land_success;
      this.selectedLanding = null;
    }
    else {
      this.selectedLanding = condition;
      this.params.land_success = condition;
    }
    this.router.navigate(['launches'], { queryParams: this.params});
  }

}
