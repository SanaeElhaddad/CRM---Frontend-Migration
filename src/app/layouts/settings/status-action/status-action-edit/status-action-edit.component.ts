import { Subscription } from "rxjs";
import { StatusAction } from "./../../../../shared/models/";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-status-action-edit",
  templateUrl: "./status-action-edit.component.html",
  styleUrls: ["./status-action-edit.component.css"],
})
export class StatusActionEditComponent implements OnInit {
  @Input() selectedActionStatus = new StatusAction();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier statut de l'action";
  subscriptions = new Subscription();

  accountStatutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
      StatutCode: [this.selectedActionStatus.statusActionCode],
      StatutDescription: [this.selectedActionStatus.statusActionDescription],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
