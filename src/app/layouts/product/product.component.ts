import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/api/product.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  codeSearch: string;
  StatutDescSearch: string;
  codeStatutActionList: string[];
  searchQuery = "";
  page = 0;
  size = 10;
  className: string;
  cols: any[];
  statusActionList: Array<Product> = [];
  collectionSize: number;
  titleList = "Statut action";
  showDialog: boolean;
  subscriptions = new Subscription()
  constructor(private productService: ProductService) { }

  ngOnInit() {


  }





  }





