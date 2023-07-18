import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;

  constructor() { }

  ngOnInit() {
    this.itemsBreadcrumb = [
      { label: ' Paramètrage' },
      { label: 'Général' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };
  }

}
