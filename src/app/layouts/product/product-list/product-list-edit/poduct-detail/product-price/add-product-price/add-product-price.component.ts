import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-product-price',
  templateUrl: './add-product-price.component.html',
  styleUrls: ['./add-product-price.component.css']
})
export class AddProductPriceComponent implements OnInit {
  @Output() showDialog = new EventEmitter<Boolean>();
  isFormSubmitted = false;
  displayDialog: boolean=false;
  constructor() { }

  ngOnInit() {
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
