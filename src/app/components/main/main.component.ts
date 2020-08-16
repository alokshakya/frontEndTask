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
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params ', params);
      // on change call api;
      this.getData(params);
    });
  }

  getData(params: any) {
    this.dataService.getRecords(params).subscribe(res => {
      console.log('res', res);
    });
  }

}
