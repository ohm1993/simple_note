import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
                        {path:'dashboard',component: DashboardComponent},
                        {path:'login',component: LoginComponent},
                        {path:'register',component: RegisterComponent},
                        { path: '**', redirectTo: 'dashboard' }];
@NgModule({
    imports:[
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports:[
      RouterModule
    ]
})
export class AppRoutingModule { }
