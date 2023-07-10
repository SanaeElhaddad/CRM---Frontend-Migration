import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
import { Process } from "./process";
import { ControlPlan } from "./control-plan";
import { FrequencyType } from "./frequency-type";
import { ControleType } from "./controle-type";
import { Product } from "./product";
import { ControlState } from "./control-state";
import { ControlLigneValidation } from "./control-ligne-validation";


export class ControlValidation {

    id:number;
    code:String;
   process : Process;
   frequencyType:FrequencyType ;
   frequencyValue:number ;
   product :Product;
   controlState:ControlState ;
   owner:Owner;
   controlLigneValidations: ControlLigneValidation[] = [];
   
}
