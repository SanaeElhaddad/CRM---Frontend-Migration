import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { Setting } from "./../../../../shared/models";
import { SettingsService } from "./../../../../shared/services/api/settings.service";

@Component({
  selector: "app-parametre-edit",
  templateUrl: "./parametre-edit.component.html",
  styleUrls: ["./parametre-edit.component.css"],
})
export class ParametreEditComponent implements OnInit {
  @Input() selectedSetting = new Setting();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier Paramètre";
  subscriptions = new Subscription();

  settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedSetting = new Setting();
      this.title = "Ajouter Paramètre";
    } else {
      console.log(this.selectedSetting.code);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.settingsForm = this.formBuilder.group({
      settingCode: [this.selectedSetting.code, Validators.required],
      settingValue: [this.selectedSetting.value],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedSetting.code = this.settingsForm.value["settingCode"];
    this.selectedSetting.value = this.settingsForm.value["settingValue"];

    this.subscriptions.add(
      this.settingsService.set(this.selectedSetting).subscribe(
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
    this.selectedSetting.code = null;
    this.selectedSetting.value = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
