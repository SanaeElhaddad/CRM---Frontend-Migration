import { ImageService } from './../../../../../shared/services/api/Image.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Image } from '../../../../../shared/models/Image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-image-edit',
  templateUrl: './product-image-edit.component.html',
  styleUrls: ['./product-image-edit.component.scss']
})
export class ProductImageEditComponent implements OnInit {
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() productImage = new EventEmitter<Image>();
  @Input() selectedProductImage=new Image();
  @Input() editMode: number;
  displayDialog: boolean=false;
  title = "Editer une image";
  imageProductForm:FormGroup;
  logoProduct: number[];

  subsriptions = new Subscription();
  constructor(private formBuilder: FormBuilder,
              private imageService:ImageService,
              private messageService:MessageService,
              private spinner: NgxSpinnerService,
              ) { }

  ngOnInit() {
    this.displayDialog = true;
    if(!this.selectedProductImage?.id){
      this.selectedProductImage=new Image();
    }
    this.initForm();
    this.displayDialog = true;

  }
initForm(){
  this.imageProductForm = this.formBuilder.group({
    code:[this.selectedProductImage.code, Validators.required],
    description:[this.selectedProductImage.description],
    bytes:[this.selectedProductImage.bytes]

  })


}
onSubmitForm(){
this.selectedProductImage.code=this.imageProductForm.value["code"];
this.selectedProductImage.description=this.imageProductForm.value["description"];
console.log(this.selectedProductImage);
this.selectedProductImage.bytes=this.logoProduct;
//function pour envoyer l'objet remplir "selectedProductImage" depuis le fils a parent
this.productImage.emit(this.selectedProductImage);
this.onShowDialog();

}

myUploader(event) {
  let fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(event.target.files[0]);
  fileReader.onload = () => {
    this.logoProduct = (fileReader.result as string).split(
      ","
    )[1] as any;
  };
}


resetForm() {
this.selectedProductImage.code=null;
this.selectedProductImage.description=null;
this.selectedProductImage.bytes=null;
}

annuler(){
  let a = false;
  this.showDialog.emit(a);
  //this.router.navigateByUrl('/core/product/detail/'+this.selectedProductImage.id)
}
onShowDialog() {
  let a = false;
  this.showDialog.emit(a);
}


}
