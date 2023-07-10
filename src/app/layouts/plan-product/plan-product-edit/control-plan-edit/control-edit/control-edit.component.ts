import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Control } from './../../../../../shared/models/control';
import { ControleType } from './../../../../../shared/models/controle-type';
import { AuthenticationService } from './../../../../../shared/services';
import { ControleTypeService } from './../../../../../shared/services/api/control-type.service';

@Component({
  selector: 'app-control-edit',
  templateUrl: './control-edit.component.html',
  styleUrls: ['./control-edit.component.scss']
})
export class ControlEditComponent implements OnInit {

  @Input() selectControl = new Control();
  @Input() editMode = false;
  @Output() lineControlEdited = new EventEmitter<Control>();
  @Output() showDialog = new EventEmitter<boolean>();

  selectControlType: ControleType = new ControleType();
  displayDialog: boolean;
  controlForm: FormGroup;
  controlTypeList: Array<ControleType> = [];

  subscriptions = new Subscription();
  controleTypeResponseId: number;
  isFormSubmitted = false;
  editModee = false;
  title = 'Modifier controle';

  constructor(private controleTypeService: ControleTypeService,

    private authentificationService:AuthenticationService,
  ) { }


  initForm() {

    this.controlForm = new FormGroup({

      'fControlType': new FormControl(this.selectControl.controleType, Validators.required),
      'fControlTypeInterval': new FormControl(this.selectControl.responseIntervale),
      'fControlTypeValue': new FormControl(this.selectControl.reponseValue),
     
    });

  }
  ngOnInit() {

    if (this.editMode == false) {
      this.title = 'Ajouter controle';
      this.selectControl = new Control();
    } else {
   
      console.log(this.selectControl);
      
     this.controleTypeResponseId = this.selectControl.controleType.controleTypeResponse.id;

      }
    this.subscriptions.add(this.controleTypeService.findAll().subscribe(
      data => {
        this.controlTypeList = data;
      }
    ));
   
    console.log(this.selectControl);
    
    
    this.initForm();
    this.displayDialog = true;
  }

  onSubmit(close = false) {
    this.isFormSubmitted = true;
    if (this.controlForm.invalid) { return; }


    this.selectControl.responseIntervale = this.controlForm.value['fControlTypeInterval'];

    console.log(this.selectControl);


    this.selectControl.owner=this.authentificationService.getDefaultOwner();

    

    this.lineControlEdited.emit(this.selectControl);

    this.displayDialog = false;

  }


  onSelectControlType(event) {
    this.selectControlType = event.value as ControleType;
    this.selectControl.controleType = this.selectControlType;
    this.controleTypeResponseId = this.selectControl.controleType.controleTypeResponse.id;


  }

 



  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);

    this.displayDialog = false;
  }

}
