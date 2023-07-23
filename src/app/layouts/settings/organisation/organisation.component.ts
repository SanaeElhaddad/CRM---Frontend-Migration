import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Organisation } from "./../../../shared/models/Organisation";
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrganisationService } from "./../../../shared/services/api/organisation.service";

@Component({
  selector: "app-organisation",
  templateUrl: "./organisation.component.html",
  styleUrls: ["./organisation.component.css"],
})
export class OrganisationComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  fetchedOrganisation: Organisation;
  organisationForm: FormGroup;
  logoOrganisation: string;
  submittedOrg: Organisation = new Organisation();

  constructor(
    private organisationService: OrganisationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.organisationService.findAll().subscribe(
        (data) => {
          this.fetchedOrganisation = data[0];
          this.logoOrganisation = this.fetchedOrganisation.image;
          this.initForm();
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: JSON.stringify(error),
          });
        }
      )
    );
  }

  initForm() {
    this.organisationForm = this.formBuilder.group({
      organisationCode: new FormControl(
        this.fetchedOrganisation.code,
        Validators.required
      ),
      organisationName: new FormControl(
        this.fetchedOrganisation.nomOrganisation,
        Validators.required
      ),
      siret: new FormControl(
        this.fetchedOrganisation.siret,
        Validators.required
      ),
      fax: new FormControl(this.fetchedOrganisation.fax),
      telPrincipal: new FormControl(this.fetchedOrganisation.fax),
      description: new FormControl(this.fetchedOrganisation.description),
      taxeProfessionelle: new FormControl(
        this.fetchedOrganisation.professionalTax,
        Validators.required
      ),
      identificationFiscale: new FormControl(
        this.fetchedOrganisation.taxpayerIdentification,
        Validators.required
      ),
      idCommunEntreprise: new FormControl(
        this.fetchedOrganisation.commonIdentifierCompany,
        Validators.required
      ),
      classificationFiscale: new FormControl(
        this.fetchedOrganisation.classificationFiscale
      ),
      siteWeb: new FormControl(this.fetchedOrganisation.webSite),
      nAdresseSiegePrincipal: new FormControl(
        this.fetchedOrganisation.nomAdressSiegePrincipal,
        Validators.required
      ),
      premiereLigneAdresse: new FormControl(
        this.fetchedOrganisation.firstAddressLine,
        Validators.required
      ),
      deuxiemeLigneAdresse: new FormControl(
        this.fetchedOrganisation.secondAddressLine
      ),
      ville: new FormControl(
        this.fetchedOrganisation.city,
        Validators.required
      ),
      codeZip: new FormControl(
        this.fetchedOrganisation.zipCode,
        Validators.required
      ),
      pays: new FormControl(
        this.fetchedOrganisation.country,
        Validators.required
      ),
      nomContactPrincipal: new FormControl(
        this.fetchedOrganisation.nomContactPrincipal,
        Validators.required
      ),
      prenomContactPrincipal: new FormControl(
        this.fetchedOrganisation.prenomContactPrincipal,
        Validators.required
      ),
      emailContactPrincipal: new FormControl(
        this.fetchedOrganisation.emailContactPrincipal,
        Validators.required
      ),
      telContactPrincipal: new FormControl(
        this.fetchedOrganisation.telephoneContactPrincipal
      ),
      conditionsGenerals: new FormControl(
        this.fetchedOrganisation.generaleCondition
      ),
      nomContactLogistique: new FormControl(
        this.fetchedOrganisation.nomContactLogistique,
        Validators.required
      ),
      prenomContactLogistique: new FormControl(
        this.fetchedOrganisation.prenomContactLogistique,
        Validators.required
      ),
      emailContactLogistique: new FormControl(
        this.fetchedOrganisation.emailContactPrincipal,
        Validators.required
      ),
      telContactLogistique: new FormControl(
        this.fetchedOrganisation.telephoneContactLogistique
      ),
      commentContactLogistique: new FormControl(
        this.fetchedOrganisation.comment
      ),
    });
  }

  onSubmitForm() {
    this.submittedOrg.id = this.fetchedOrganisation.id;
    this.submittedOrg.code = this.organisationForm.value["organisationCode"];
    this.submittedOrg.nomOrganisation =
      this.organisationForm.value["organisationName"];
    this.submittedOrg.description = this.organisationForm.value["description"];
    this.submittedOrg.telephonePrincipalOrganisation =
      this.organisationForm.value["telPrincipal"];
    this.submittedOrg.fax = this.organisationForm.value["fax"];
    this.submittedOrg.siret = this.organisationForm.value["siret"];
    this.submittedOrg.professionalTax =
      this.organisationForm.value["taxeProfessionelle"];
    this.submittedOrg.taxpayerIdentification =
      this.organisationForm.value["identificationFiscale"];
    this.submittedOrg.commonIdentifierCompany =
      this.organisationForm.value["idCommunEntreprise"];
    this.submittedOrg.classificationFiscale =
      this.organisationForm.value["classificationFiscale"];
    this.submittedOrg.webSite = this.organisationForm.value["siteWeb"];
    this.submittedOrg.nomAdressSiegePrincipal =
      this.organisationForm.value["nAdresseSiegePrincipal"];
    this.submittedOrg.firstAddressLine =
      this.organisationForm.value["premiereLigneAdresse"];
    this.submittedOrg.secondAddressLine =
      this.organisationForm.value["deuxiemeLigneAdresse"];
    this.submittedOrg.city = this.organisationForm.value["ville"];
    this.submittedOrg.zipCode = this.organisationForm.value["codeZip"];
    this.submittedOrg.country = this.organisationForm.value["pays"];
    this.submittedOrg.nomContactPrincipal =
      this.organisationForm.value["nomContactPrincipal"];
    this.submittedOrg.prenomContactPrincipal =
      this.organisationForm.value["prenomContactPrincipal"];
    this.submittedOrg.emailContactPrincipal =
      this.organisationForm.value["emailContactPrincipal"];
    this.submittedOrg.telephoneContactPrincipal =
      this.organisationForm.value["telContactPrincipal"];
    this.submittedOrg.generaleCondition =
      this.organisationForm.value["conditionsGenerals"];
    this.submittedOrg.nomContactLogistique =
      this.organisationForm.value["nomContactLogistique"];
    this.submittedOrg.prenomContactLogistique =
      this.organisationForm.value["prenomContactLogistique"];
    this.submittedOrg.emailContactLogistique =
      this.organisationForm.value["emailContactLogistique"];
    this.submittedOrg.telephoneContactLogistique =
      this.organisationForm.value["telContactLogistique"];
    this.submittedOrg.comment =
      this.organisationForm.value["commentContactLogistique"];
    this.submittedOrg.image = this.logoOrganisation;
    this.submittedOrg.addressType = 1;

    console.log(this.submittedOrg);

    this.spinner.show();
    this.subscriptions.add(
      this.organisationService.set(this.submittedOrg).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément est Enregistré avec succès",
          });
          this.spinner.hide();
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
          console.log(error);

          this.spinner.hide();
        }
      )
    );
  }

  myUploader(event) {
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = () => {
      console.log(fileReader.result);
      this.logoOrganisation = (fileReader.result as string).split(
        ","
      )[1] as any;
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
