import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-conditionnement',
  templateUrl: './product-conditionnement.component.html',
  styleUrls: ['./product-conditionnement.component.css']
})
export class ProductConditionnementComponent implements OnInit {
  searchQuery = "";
  page = 0;
  size = 10;
  className: string;
  cols: any[];
  collectionSize: number;
  titleList = "Pseudos et conditionnements";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: '', header: 'Unité de mesure', type: 'string' },
      { field: '', header: 'Pseudo du produit', type: 'string' },
      { field: ''  , child :"adrCode" , header: 'Propriétaire', type: 'object' },
      { field: '', header: 'Prix de vente', type: 'number' },
      { field: '', header: '', type: '' }

    ];
  }

}
