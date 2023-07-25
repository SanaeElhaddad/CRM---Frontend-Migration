export class Privilege {
  prvId: number;
  prvCode: string;
  prvDescription: string;
  prvCreationDate: Date;
  prvUpdateDate: Date;
  prvActive: boolean;
  prvParent: Privilege;
  // private Set<Privilege> prvChildrens;
  // private Set<RolePrivilege> prvUsrRolePrivileges;
}
