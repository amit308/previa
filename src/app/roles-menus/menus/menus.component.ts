import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  roles: any = [];
  menus: any = [];
  organizations: any;
  filteredOrganizations: any;
  selectedRoleMenus: any = [];
  selectedRole: string;
  selectedSubDivisionId: string;
  user: any;
  subDivisionUsers: any = [];
  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'));
    this.getOrganizationData();
    this.getRoles();
    this.getRoleMenus();
    this.getSubdivisionUsers(null);
  }
  getRoles() {
    this.healthService.roles().subscribe((res) => {
      this.roles = res.data.roles;
    });
  }
  getRoleMenus() {
    const params = {
      roleId: this.user?.roleId,
      subdivision_id: this.selectedSubDivisionId
        ? this.selectedSubDivisionId
        : this.user?.subdivision_id
    };
    this.healthService.menus(params).subscribe((res) => {
      this.menus = res.data.roleMenus;
    });
  }
  onChangeRole(event, type) {
    if (type == '1' && this.user.subdivision_id) {
      this.selectedRole = event.value;
      this.getSelectedMenus(event.value);
    }
    if (type == '2') {
      this.getSubdivisionUsers(event.value);
    }
  }
  onChangeMenu(event, menuId) {
    if (this.selectedRole && menuId) {
      const obj = {
        roleId: this.selectedRole,
        menus: [menuId],
        subdivision_id: this.selectedSubDivisionId
          ? this.selectedSubDivisionId
          : this.user?.subdivision_id,

        isDeleteMenu: !event.target.checked,
      };
      this.healthService.addRemoveMenu(obj).subscribe((res) => {
        this.getSelectedMenus(this.selectedRole);
      });
    }
  }
  getSelectedMenus(roleId) {
    const params = {
      roleId: roleId,
      subdivision_id: this.selectedSubDivisionId
        ? this.selectedSubDivisionId
        : this.user?.subdivision_id,
    };
    this.healthService.menus(params).subscribe((res) => {
      console.log({ res });
      this.selectedRoleMenus = res.data.roleMenus;
      const temp = [];
      this.menus.forEach((menu) => {
        const findMenu = this.selectedRoleMenus.find((sMenu) => {
          return sMenu?.menuId == menu?.menuId;
        });
        if (findMenu) {
          menu['isChecked'] = true;
        } else {
          menu['isChecked'] = null;
        }

        temp.push(menu);
      });
    });
  }
  getRoleOrgMenus() {
    const params = {
      roleId: this.selectedRole,
      subdivision_id: this.selectedSubDivisionId
        ? this.selectedSubDivisionId
        : this.user?.subdivision_id,
    };
    this.healthService.menus(params).subscribe((res) => {
      this.selectedRoleMenus = res.data.roleMenus;
      const temp = [];
      this.menus.forEach((menu) => {
        const findMenu = this.selectedRoleMenus.find((sMenu) => {
          return sMenu?.menuId == menu?.menuId;
        });
        if (findMenu) {
          menu['isChecked'] = true;
        } else {
          menu['isChecked'] = null;
        }

        temp.push(menu);
      });
    });
  }
  getSubdivisionUsers(roleId) {
    const obj = {
      subdivision: this.user?.subdivision_id,
      role: roleId,
    };
    this.healthService.subdivisionUsers(obj).subscribe((res) => {
      this.subDivisionUsers = res?.data?.users;
    });
  }

  getOrganizationData() {
    let obj = {
      companyId: this.user.company,
    };

    this.healthService.getOrganizationData(obj).subscribe((res) => {
      this.organizations = res.data.subDivisions;
      this.filteredOrganizations = this.organizations;
    });
  }
}
