import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FrequencyTypeService } from './../../../../shared/services/api/frequency-type.service';
import { ProcessService } from './../../../../shared/services/api/process.service';
import { ControlPlan } from './../../../../shared/models/control-plan';
import { AuthenticationService } from './../../../../shared/services';
import { Process } from './../../../../shared/models/process';
import { FrequencyType } from './../../../../shared/models/frequency-type';
import { Control } from './../../../../shared/models/control';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-control-plan-edit',
  templateUrl: './control-plan-edit.component.html',
  styleUrls: ['./control-plan-edit.component.scss']
})
export class ControlPlanEditComponent implements OnInit {

  @Input() selectControlPlan = new ControlPlan();
  @Input() editMode = false;
  @Output() lineControlPlanEdited = new EventEmitter<ControlPlan>();
  @Output() showDialog = new EventEmitter<boolean>();
  showDialogControl: boolean;
  selectControl :Control = new Control();

  displayDialog: boolean;
  controlPlanForm: FormGroup;

  subscriptions = new Subscription();
  controlPlaneTypeResponseId: number;
  isFormSubmitted = false;
  title = 'Modifier Plan de Controle';
  frequenceTypeId: number;
  processList: Array<Process> = [];
  frequencyTypeList: Array<FrequencyType> = [];
  constructor(

    private authentificationService:AuthenticationService,
    private processService: ProcessService,
    private frequencyTypeService: FrequencyTypeService,
    private confirmationService: ConfirmationService,
  ) { }


  initForm() {

    this.controlPlanForm = new FormGroup({

      'fFrequencyType': new FormControl(this.selectControlPlan.frequencyType, Validators.required),
      'fFrequencyTypeValue': new FormControl(this.selectControlPlan.frequencyValue),
      'fProcess': new FormControl(this.selectControlPlan.process, Validators.required),
     
    });

  }
  ngOnInit() {
 
    if (this.editMode == false) {
      this.title = 'Ajouter Plan de Controle';
      this.selectControlPlan = new ControlPlan();
    } else {
      this.frequenceTypeId = this.selectControlPlan.frequencyType.id;
      console.log(this.selectControlPlan);
      
    // this.controlPlaneTypeResponseId = this.selectControlPlan.controlPlaneType.controlPlaneTypeResponse.id;

      }
     
    console.log(this.selectControlPlan);
   this.subscriptions.add(this.processService.findAll().subscribe(
      data => {
        this.processList = data;
      }
    ));
    this.subscriptions.add(this.frequencyTypeService.findAll().subscribe(
      data => {
        this.frequencyTypeList = data;
      }
    ));
    
    this.initForm();
    this.displayDialog = true;
    console.log(this.selectControlPlan.process);
 
    // this.controlPlanForm.patchValue({
    //   'fProcess': this.selectControlPlan.process
    // });
  }

  onSubmit(close = false) {
    this.isFormSubmitted = true;
    if (this.controlPlanForm.invalid) { return; }


    //this.selectControlPlan.responseIntervale = this.controlPlanForm.value['fControlPlanTypeInterval'];
    this.selectControlPlan.frequencyValue = this.controlPlanForm.value['fFrequencyTypeValue'];

    console.log(this.selectControlPlan);


    this.selectControlPlan.owner=this.authentificationService.getDefaultOwner();

    

    this.lineControlPlanEdited.emit(this.selectControlPlan);

    this.displayDialog = false;

  }

  onSelectFrequencyType(event) {
    this.selectControlPlan.frequencyType = event.value as FrequencyType;
    this.frequenceTypeId = this.selectControlPlan.frequencyType.id;
    if(this.frequenceTypeId == 1){
      
  this.selectControlPlan.frequencyValue=null;
  this.controlPlanForm.patchValue({
    'fFrequencyTypeValue': this.selectControlPlan.frequencyValue
  });
    }
   
  }
  
  onSelectProcess(event) {
    this.selectControlPlan.process = event.value as Process;
  
  }
 

 
  onLineControlEdited(line: Control) {
    
    this.selectControlPlan.controls = this.selectControlPlan.controls.filter(
      (l) => l.controleType.id !== line.controleType.id
    );
    this.selectControlPlan.controls.push(line);


  }
  onDeleteControlLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectControlPlan.controls = this.selectControlPlan.controls.filter(
          (l) => l.id !== id
        );
     
      },
    });
  }
  onShowDialogControl(line,mode){
    this.showDialogControl = true;

    if (mode== true) {
      this.selectControl = line;
      this.editMode = true;

     } else {
             this.selectControl = new Control();
             this.editMode = false;

     }

  }
 

 
  onHideDialogControl(event) {
    this.showDialogControl = event;
   }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;
  }
}
