import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ControlPlan } from './../../../shared/models/control-plan';
import { FrequencyType } from './../../../shared/models/frequency-type';
import { PlanProduct } from './../../../shared/models/plan-product';
import { Process } from './../../../shared/models/process';
import { AuthenticationService } from './../../../shared/services';
import { FrequencyTypeService } from './../../../shared/services/api/frequency-type.service';
import { PlanProductService } from './../../../shared/services/api/plan-product.service';
import { ProcessService } from './../../../shared/services/api/process.service';

@Component({
  selector: 'app-plan-product-edit',
  templateUrl: './plan-product-edit.component.html',
  styleUrls: ['./plan-product-edit.component.scss']
})
export class PlanProductEditComponent implements OnInit {

 
  selectedPlanProduct: PlanProduct = new PlanProduct();
  selectControlPlan :ControlPlan = new ControlPlan();
  planProductForm: FormGroup;
  editModeTitle = 'Inserer  Plan Produit';
  showDialog: boolean;
  editMode: boolean;
  isFormSubmitted = false;
  editModee = false;
  subscriptions = new Subscription();
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  constructor(
    private planProductService:PlanProductService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authentificationService:AuthenticationService,
 
  ) { }

  initForm() {
    this.itemsBreadcrumb = [
      { label: 'Plan Produit' },
      { label: 'Editer', routerLink: '/core/plan-product/edit' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };

    this.planProductForm = new FormGroup({
        'fcode': new FormControl(this.selectedPlanProduct.code, Validators.required),
        'fdescription': new FormControl(this.selectedPlanProduct.description, Validators.required),
  
    });

  }
  
  ngOnInit() {

    this.editModee = false;

    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModee = true;
      this.editModeTitle = 'Modifier Plan Produit';
      this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscriptions.add(this.planProductService.findById(id).subscribe(
          data => {
            this.selectedPlanProduct = data;
            
   
            this.initForm();

          },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } 

 
   // this.frequenceTypeId = this.selectedPlanProduct.frequencyType.id;

    
 this.initForm();

  }


onSubmit(close){

  this.isFormSubmitted = true;
  if (this.planProductForm.invalid) { return; }

  this.selectedPlanProduct.code = this.planProductForm.value['fcode'];
  this.selectedPlanProduct.description = this.planProductForm.value['fdescription'];

  this.selectedPlanProduct.owner=this.authentificationService.getDefaultOwner();

  console.log(this.selectedPlanProduct);
  

  this.planProductService.set(this.selectedPlanProduct).subscribe(
    dataM => {
      this.toastr.success('Elément  est Enregistré Avec Succès', 'Edition');

      this.isFormSubmitted = false;
      this.spinner.hide();
      this.selectedPlanProduct = new PlanProduct();
      this.planProductForm.reset();

      if (close) {
        this.router.navigate(['/core/plan-product/list']);
      } else {
        this.editModee = false;
        this.router.navigate(['/core/plan-product/edit']);
      }

    },
    err => {
      this.toastr.error(err.error.message);
      this.spinner.hide();
      return;
    },
    () => {
      this.spinner.hide();
    }
  );
 }



  onLineControlPlanEdited(line: ControlPlan) {
    
    this.selectedPlanProduct.controlPlans = this.selectedPlanProduct.controlPlans.filter(
      (l) => l.process.id !== line.process.id
    );
    this.selectedPlanProduct.controlPlans.push(line);


  }
  onDeleteControlPlanLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedPlanProduct.controlPlans = this.selectedPlanProduct.controlPlans.filter(
          (l) => l.id !== id
        );
     
      },
    });
  }

  onShowDialogControlPlan(line,mode){
    this.showDialog = true;

    if (mode== true) {
      this.selectControlPlan = line;
      this.editMode = true;

     } else {
             this.selectControlPlan = new ControlPlan();
             this.editMode = false;

     }

  }
 

 
  onHideDialogControlPlan(event) {
    this.showDialog = event;
   }


}
