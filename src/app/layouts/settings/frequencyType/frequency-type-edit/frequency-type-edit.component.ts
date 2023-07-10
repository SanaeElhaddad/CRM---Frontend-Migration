import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FrequencyType } from './../../../../shared/models/frequency-type';
import { AuthenticationService } from './../../../../shared/services';
import { FrequencyTypeService } from './../../../../shared/services/api/frequency-type.service';

@Component({
  selector: 'app-frequency-type-edit',
  templateUrl: './frequency-type-edit.component.html',
  styleUrls: ['./frequency-type-edit.component.css']
})
export class FrequencyTypeEditComponent implements OnInit {

  @Input() selectedFrequencyType = new FrequencyType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  frequencyTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de frequence';
  subscriptions= new Subscription();


  constructor(
    private frequencyTypeService: FrequencyTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedFrequencyType = new FrequencyType();
      this.title = 'Ajouter un type de frequence';
    }

    this.displayDialog = true;
    this.initForm();

   

  }

  initForm() {
    this.frequencyTypeForm = new FormGroup({
      'code': new FormControl(this.selectedFrequencyType.code, Validators.required),
      'description': new FormControl(this.selectedFrequencyType.description),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.frequencyTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedFrequencyType.code = this.frequencyTypeForm.value['code'];
    this.selectedFrequencyType.description = this.frequencyTypeForm.value['description'];
 this.selectedFrequencyType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");
 
 console.log(this.selectedFrequencyType);
 
    this.subscriptions.add( this.frequencyTypeService.set(this.selectedFrequencyType).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
