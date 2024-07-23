import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductPriceByZone } from '../../../../../shared/models/ProductPriceByZone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductPriceByZoneServiceService } from '../../../../../shared/services/api/product-price-by-zone-service.service';
import { Zone } from '../../../../../shared/models/zone';
import { ZoneService } from '../../../../../shared/services/api/zone.service';


@Component({
  selector: 'app-add-product-price',
  templateUrl: './add-product-price.component.html',
  styleUrls: ['./add-product-price.component.css']
})
export class AddProductPriceComponent implements OnInit {
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() productPriceByZone  = new EventEmitter<ProductPriceByZone>();
  @Input() selectedProductPriceByZone = new ProductPriceByZone();
  @Input() editMode: number;
  title = "Editer prix de produit par zone";
  codeZone:Array<Zone>=[];
  isFormSubmitted = false;
  displayDialog: boolean=false;
  subsriptions = new Subscription();

  productPriceForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private messageService:MessageService,
              private spinner: NgxSpinnerService,
              private productPriceByZoneService:ProductPriceByZoneServiceService,
              private zoneService:ZoneService ) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedProductPriceByZone = new ProductPriceByZone();
      this.title = "Ajouter prix de produit par zone";
    }
    this.displayDialog = true;
    this.initForm();

  }
  initForm() {
    this.productPriceForm = this.formBuilder.group({
      zone: [this.selectedProductPriceByZone?.zone, Validators.required],
      wholeSalePrice: [this.selectedProductPriceByZone?.wholeSalePrice],
      retailPrice :[this.selectedProductPriceByZone?.retailPrice],
      semiWholeSalePrice:[this.selectedProductPriceByZone?.semiWholeSalePrice]
    });
  }
  onCodeSearch(event: any) {
    this.subsriptions.add(
      this.zoneService.findAll().subscribe((data) => {
        console.log(data);
        this.codeZone = data;
        console.log("Zone Code"+ this.codeZone);


      })
    );
  }
  onSubmitForm() {
    this.spinner.show();

    this.selectedProductPriceByZone.zone = this.productPriceForm.value["zone"];
    this.selectedProductPriceByZone.wholeSalePrice = this.productPriceForm.value["wholeSalePrice"];
    this.selectedProductPriceByZone.retailPrice = this.productPriceForm.value["retailPrice"];
    this.selectedProductPriceByZone.semiWholeSalePrice = this.productPriceForm.value["semiWholeSalePrice"];
    this.productPriceByZone.emit(this.selectedProductPriceByZone);
    this.showDialog.emit(false)
          this.spinner.hide();

  }
  resetForm() {
    this.selectedProductPriceByZone.zone = null;
    this.selectedProductPriceByZone.wholeSalePrice = null;
    this.selectedProductPriceByZone.retailPrice=null;
    this.selectedProductPriceByZone.semiWholeSalePrice=null;
  }
  onShowDialog() {
this.showDialog.emit(false)
 }

}
