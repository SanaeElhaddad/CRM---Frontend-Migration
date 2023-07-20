import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;

  constructor() { }

  ngOnInit() {
    this.itemsBreadcrumb = [
      { label: ' Relation' },
      { label: 'Clients' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };
  }

}
