import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticar/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdicionarComponent } from './salvar/adicionar/adicionar.component';
import { CountriesDetailsComponent } from './countries-details/countries-details.component';
import { DeleteComponent } from './delete/delete/delete.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'adicionar', component: AdicionarComponent },
  { path: 'country/:id', component: CountriesDetailsComponent },
  { path: 'delete-country/:id', component: DeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
