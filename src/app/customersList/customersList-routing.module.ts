import { actionEnum } from './../common/enums/actionEnum';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customersList.component';

const routes: Routes = [
    {
        path: '',
        component: CustomersListComponent,
    },
    {
        path: 'add',
        component: EditComponent,
        data:
        {
            title: 'menu_users',
            action: actionEnum.Add
        }
        },
    {
        path: 'edit/:id',
        component: EditComponent,
        data:
        {
            title: 'menu_users',
            action: actionEnum.Edit
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersListRoutingModule { }
