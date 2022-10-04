import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationComponent } from './operation/operation.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { StatementComponent } from './statement/statement.component';

const routes: Routes = [
{path: 'home', component:HomeComponent},
{path:'operation/:type/:clientId', component:OperationComponent},
{path:'statement', component:StatementComponent},
{path: '', pathMatch:'full', redirectTo: 'home'},
{path: '**', component: PageNotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
