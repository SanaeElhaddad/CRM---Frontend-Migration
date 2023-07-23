import { ClientCategoryService } from "./../../../../shared/services/api/client-category.service";
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { ClientCategory } from "./../../../../shared/models";

@Component({
  selector: "app-categorie-edit",
  templateUrl: "./categorie-edit.component.html",
  styleUrls: ["./categorie-edit.component.css"],
})
export class CategorieEditComponent implements OnInit {
  @Input() selectedClientCategory = new ClientCategory();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier Categorie Client";
  subscriptions = new Subscription();

  clientCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private clientCategoryService: ClientCategoryService
  ) {}

  ngOnInit(): void {
    if (this.editMode === 1) {
      this.selectedClientCategory = new ClientCategory();
      this.title = "Ajouter Paramètre";
    } else {
      console.log(this.selectedClientCategory.code);
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.clientCategoryForm = this.formBuilder.group({
      ClientCategoryCode: [
        this.selectedClientCategory.code,
        Validators.required,
      ],
      ClientCategoryDesc: [this.selectedClientCategory.description],
    });
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();

    this.selectedClientCategory.code =
      this.clientCategoryForm.value["ClientCategoryCode"];
    this.selectedClientCategory.description =
      this.clientCategoryForm.value["ClientCategoryDesc"];

    this.subscriptions.add(
      this.clientCategoryService.set(this.selectedClientCategory).subscribe(
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
    this.selectedClientCategory.code = null;
    this.selectedClientCategory.description = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
