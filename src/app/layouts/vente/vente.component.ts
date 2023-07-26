import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-vente",
  templateUrl: "./vente.component.html",
  styleUrls: ["./vente.component.css"],
})
export class VenteComponent implements OnInit {
  items: MenuItem[];
  home: MenuItem;

  constructor() {}

  ngOnInit(): void {
    this.items = [{ label: "Vente" }, { label: "Devis" }];
    this.home = { icon: "pi pi-home", routerLink: "/" };
  }
}
