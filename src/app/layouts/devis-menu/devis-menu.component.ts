import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devis-menu',
  templateUrl: './devis-menu.component.html',
  styleUrls: ['./devis-menu.component.css']
})
export class DevisMenuComponent implements OnInit {

  itemsBreadcrumb: MenuItem[];

  homeBreadcrumb: MenuItem;
  constructor() {}

  ngOnInit(): void {
    this.itemsBreadcrumb = [{ label: "Vente" }, { label: "Devis" }, {label: "list"}];

    this.homeBreadcrumb = { icon: "pi pi-home", routerLink: "/" };
  }
}
