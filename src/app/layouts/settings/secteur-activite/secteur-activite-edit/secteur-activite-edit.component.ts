import { ActivityAreaService } from "./../../../../shared/services/api/activity-area.service";
import { Subscription } from "rxjs";
import { ActivityArea } from "./../../../../shared/models/";
import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-secteur-activite-edit",
  templateUrl: "./secteur-activite-edit.component.html",
  styleUrls: ["./secteur-activite-edit.component.css"],
})
export class SecteurActiviteEditComponent implements OnInit {
  @Input() selectedActivityArea = new ActivityArea();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier secteur d'activité";
  subscriptions = new Subscription();

  activityAreaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private activityAreaService: ActivityAreaService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedActivityArea = new ActivityArea();
      this.title = "Ajouter Unité de mesure";
    } else {
      console.log(this.selectedActivityArea.activityAreaCode);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.activityAreaForm = this.formBuilder.group({
      activityAreaCode: [
        this.selectedActivityArea.activityAreaCode,
        Validators.required,
      ],
      activityAreaDescription: [
        this.selectedActivityArea.activityAreaDescription,
      ],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedActivityArea.activityAreaCode =
      this.activityAreaForm.value["activityAreaCode"];
    this.selectedActivityArea.activityAreaDescription =
      this.activityAreaForm.value["activityAreaDescription"];

    this.subscriptions.add(
      this.activityAreaService.set(this.selectedActivityArea).subscribe(
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
            detail: JSON.stringify(error),
          });
        },
        () => {
          this.spinner.hide();
        }
      )
    );
  }
  resetForm() {
    this.selectedActivityArea.activityAreaCode = null;
    this.selectedActivityArea.activityAreaDescription = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
