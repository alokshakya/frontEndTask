import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  limit: number;
  launchYear: number;
  launchSuccess: boolean;
  landSuccess: boolean;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params ', params);
    });
  }

}
