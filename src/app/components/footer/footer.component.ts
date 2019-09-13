import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/configs/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  config: Config = new Config();

  current_year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}
}
