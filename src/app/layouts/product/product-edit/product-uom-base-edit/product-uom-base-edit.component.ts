import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UomService } from '../../../../shared/services/api/uom.service';
import { Uom } from '../../../../shared/models/uom';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-uom-base-edit',
  templateUrl: './product-uom-base-edit.component.html',
  styleUrls: ['./product-uom-base-edit.component.scss']
})
export class ProductUomBaseEditComponent implements OnInit {

   @Output() showDialog=new EventEmitter<boolean>();
   displayDialog: boolean=false;
   title:string;
   uomBase=new Uom();
   uomBaseForm:FormGroup;


  constructor(private uomService:UomService,
              private formBuilder:FormBuilder,
              private messageService:MessageService,
              private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.displayDialog=true;
    this.title="Ajouter une unité de base"
    this.initForm();

  }
  initForm(){
    this.uomBaseForm=this.formBuilder.group({
      uomCode:[this.uomBase.uomCode,Validators.required],
      uomDescription:[this.uomBase.uomDescription]

    })
  }
  onSubmitForm(){
    this.uomBase.uomCode=this.uomBaseForm.value['uomCode'];
    this.uomBase.uomDescription=this.uomBaseForm.value['uomDescription'];
  this.uomService.set(this.uomBase).subscribe(data=>{
    console.log(data);
    this.messageService.add({
      severity: "success",
      summary: "Edition",
      detail: "Image est Enregistré avec succès",
    });
    this.displayDialog = false;
  },
  (error) => {
    this.messageService.add({
      severity: "error",
      summary: "Erreur",
      detail: JSON.stringify(error),
    });
  },
  () => {
    this.spinner.hide();
  } );
  }
  onReset(){
    this.uomBase.uomCode=null;
    this.uomBase.uomDescription=null;
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
  annuler(){
    let a = false;
    this.showDialog.emit(a);
  }


}
