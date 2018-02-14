// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';
// ----------------importing statements for local libraries and plugins ends----------------------


@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  providers:[AppProvider]
})
export class WelcomeScreenComponent implements OnInit {

  constructor(private router:Router,private appProvider:AppProvider) { }

  ngOnInit() {
  }

}
