import { Validators } from "@angular/forms";
import { PrerequisteTypeService } from "./../../../../shared/services/api/prerequiste-type.service";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder } from "@angular/forms";
import { EventEmitter, Input, Output } from "@angular/core";
import { PrerequisiteType } from "./../../../../shared/models";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-prerequis-edit",
  templateUrl: "./prerequis-edit.component.html",
  styleUrls: ["./prerequis-edit.component.css"],
})
export class PrerequisEditComponent implements OnInit {
  @Input() selectedPrerequisiteType = new PrerequisiteType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier type prerequis";
  subscriptions = new Subscription();

  prerequisiteTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private prerequisteTypeService: PrerequisteTypeService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedPrerequisiteType = new PrerequisiteType();
      this.title = "Ajouter type prerequis";
    } else {
      console.log(this.selectedPrerequisiteType.code);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.prerequisiteTypeForm = this.formBuilder.group({
      prerequisiteTypeCode: [
        this.selectedPrerequisiteType.code,
        Validators.required,
      ],
      prerequisiteTypeDesc: [this.selectedPrerequisiteType.description],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedPrerequisiteType.code =
      this.prerequisiteTypeForm.value["prerequisiteTypeCode"];
    this.selectedPrerequisiteType.description =
      this.prerequisiteTypeForm.value["prerequisiteTypeDesc"];

    this.subscriptions.add(
      this.prerequisteTypeService.set(this.selectedPrerequisiteType).subscribe(
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
          console.log(JSON.stringify(error));
        },
        () => {
          this.spinner.hide();
        }
      )
    );
  }
  resetForm() {
    this.selectedPrerequisiteType.code = null;
    this.selectedPrerequisiteType.description = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
