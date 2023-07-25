import { Privilege } from "./../../../../shared/models/Privilege";
import { Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder } from "@angular/forms";
import { HabilitationService } from "./../../../../shared/services/api/habilitation.service";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Habilitation } from "./../../../../shared/models/";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-habilitation-edit",
  templateUrl: "./habilitation-edit.component.html",
  styleUrls: ["./habilitation-edit.component.css"],
})
export class HabilitationEditComponent implements OnInit {
  @Input() selectedHabilitation = new Privilege();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier Habilitation";
  subscriptions = new Subscription();

  HabilitationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private habilitationService: HabilitationService
  ) {}

  ngOnInit(): void {

    if (this.editMode === 1) {
      this.selectedHabilitation = new Privilege();
      this.title = "Ajouter Habilitation";
    } else {
      console.log(this.selectedHabilitation.prvCode);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    console.log(this.selectedHabilitation.prvCode);

    this.HabilitationForm = this.formBuilder.group({
      habilitationCode: [
        this.selectedHabilitation.prvCode,
        Validators.required,
      ],
      habilitationDesc: [this.selectedHabilitation.prvDescription],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedHabilitation.prvCode =
      this.HabilitationForm.value["habilitationCode"];
    this.selectedHabilitation.prvDescription =
      this.HabilitationForm.value["habilitationDesc"];

    this.subscriptions.add(
      this.habilitationService.set(this.selectedHabilitation).subscribe(
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
    this.selectedHabilitation.prvCode = null;
    this.selectedHabilitation.prvDescription = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
