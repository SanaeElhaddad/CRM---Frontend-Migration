import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { Uom } from "../../../../shared/models/";
import { UomService } from "../../../../shared/services/api/uom.service";

@Component({
  selector: "app-unite-mesure-edit",
  templateUrl: "./unite-mesure-edit.component.html",
  styleUrls: ["./unite-mesure-edit.component.css"],
})
export class UniteMesureEditComponent implements OnInit, OnDestroy {
  @Input() selectedUom = new Uom();
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
    private uomService: UomService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedUom = new Uom();
      this.title = "Ajouter statut de l'action";
    } else {
      console.log(this.selectedUom.uomCode);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountStatutForm = this.formBuilder.group({
      StatutCode: [this.selectedUom.uomCode, Validators.required],
      StatutDescription: [this.selectedUom.uomDescription],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedUom.uomCode = this.accountStatutForm.value["StatutCode"];
    this.selectedUom.uomDescription =
      this.accountStatutForm.value["StatutDescription"];

    this.subsriptions.add(
      this.uomService.set(this.selectedUom).subscribe(
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
    this.selectedUom.uomCode = null;
    this.selectedUom.uomDescription = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
