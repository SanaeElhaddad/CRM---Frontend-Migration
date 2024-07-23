import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/api/product.service';
import { Product } from '../../../../shared/models/product';
import { PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ImageService } from '../../../../shared/services/api/Image.service';
import { Image } from '../../../../shared/models/Image';
import { EmittedOBject } from '../../../../shared/components/data-table/emitted-object';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  productSelected:Product;
  productImageList:Array<Image>=[]
  selectedProductImage=new Image;
  productImageEdited:Image;
  editMode:number;
  showDialog: boolean = false;
  subscriptions = new Subscription();

  constructor(private productService:ProductService,
              private imageService:ImageService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              ) { }

  ngOnInit() {

  this.onUploadImage();
  }

 onUploadImage(){
  this.productSelected=this.productService.getProduct();
  let id =this.productSelected?.id==undefined ? 0 : this.productSelected.id;
  this.imageService.find("product.id:"+id).subscribe(
    data=>{
      this.productImageList=data

    });
 }

  onObjectDeleted(image:Image) {
    console.log(image.id);
    this.imageService.delete(image.id).subscribe(data=>{
      this.messageService.add({
              severity: "success",
              summary: "Suppression",
              detail: "photo Supprimer avec Succés",
            });
            this.confirmationService.close();
          })
          this.onUploadImage();

    }


  getProductImage(event:Image){
    this.productImageList=this.productImageList.filter(
      (item)=>item !== this.selectedProductImage[0]);
      this.productImageList.push(event);
      this.imageService.setImage(this.productImageList)
      console.log(this.productImageList);

  }
  onShowDialog() {
    this.showDialog = true;

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onEditImage(image:Image){

    this.selectedProductImage=image
    this.showDialog = true;
  }
  paginate(event){
    const newPageNumber = event.page + 1;
  }

}
