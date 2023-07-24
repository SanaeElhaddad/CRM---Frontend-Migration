import { Validators } from '@angular/forms';
import { BusinessTypeService } from './../../../../shared/services/api/business-type.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BusinessType } from './../../../../shared/models/BusinessType';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buisness-type-edit',
  templateUrl: './buisness-type-edit.component.html',
  styleUrls: ['./buisness-type-edit.component.css']
})
export class BuisnessTypeEditComponent implements OnInit {

  @Input() selectedBusinessType = new BusinessType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier Categorie Client";
  subscriptions = new Subscription();

  BusinessTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private businessTypeService: BusinessTypeService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedBusinessType = new BusinessType();
      this.title = "Ajouter type d'affaire";
    } else {
      console.log(this.selectedBusinessType.code);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.BusinessTypeForm = this.formBuilder.group({
      businessTypeCode: [
        this.selectedBusinessType.code,
        Validators.required,
      ],
      businessTypeDesc: [this.selectedBusinessType.description],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedBusinessType.code =
      this.BusinessTypeForm.value["businessTypeCode"];
    this.selectedBusinessType.description =
      this.BusinessTypeForm.value["businessTypeDesc"];

    this.subscriptions.add(
      this.businessTypeService.set(this.selectedBusinessType).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément est Enregistré avec succès",
          });

          this.displayDialog = false;
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        },
        () => {
          this.spinner.hide();
        }
      )
    );
  }
  resetForm() {
    this.selectedBusinessType.code = null;
    this.selectedBusinessType.description = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
