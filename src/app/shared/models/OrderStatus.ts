export  class OrderStatus {

  id!: number;
  code!: string;
  description!: string;
  creationDate!: Date;
  updateDate!: Date;
  // user: User;
  orderType!: boolean;
  archivable!: boolean;
  // organisation: Organization;
  devis!: boolean;
  saleOrder!: boolean;
  purshaseOrder!: boolean;
  reception!: boolean;
  active!: boolean;

}
