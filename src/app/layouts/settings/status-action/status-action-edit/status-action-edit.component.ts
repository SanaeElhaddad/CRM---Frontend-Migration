import { ActionStatusService } from "./../../../../shared/services/api/action-status.service";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { StatusAction } from "./../../../../shared/models/";
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThirdPartyDraggable } from "@fullcalendar/interaction";

@Component({
  selector: "app-status-action-edit",
  templateUrl: "./status-action-edit.component.html",
  styleUrls: ["./status-action-edit.component.css"],
})
export class StatusActionEditComponent implements OnInit, OnDestroy {
  @Input() selectedActionStatus = new StatusAction();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier statut de l'action";
  subscriptions = new Subscription();
  subsriptions = new Subscription();

  accountStatutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private actionStatusService: ActionStatusService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.title = "Ajouter statut de l'action";
    } else {
      console.log(this.selectedActionStatus);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountStatutForm = this.formBuilder.group({
      StatutCode: [
        this.selectedActionStatus.statusActionCode,
        Validators.required,
      ],
      StatutDescription: [this.selectedActionStatus.statusActionDescription],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedActionStatus.statusActionCode =
      this.accountStatutForm.value["StatutCode"];
    this.selectedActionStatus.statusActionDescription =
      this.accountStatutForm.value["StatutDescription"];

    this.subsriptions.add(
      this.actionStatusService.set(this.selectedActionStatus).subscribe(
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
    this.selectedActionStatus.statusActionCode = null;
    this.selectedActionStatus.statusActionDescription = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
