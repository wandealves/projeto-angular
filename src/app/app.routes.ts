import { Routes } from "@angular/router";

import { HomeComponent } from "./navegacao/home/home.component";
import { SobreComponent } from "./institucional/sobre/sobre.component";
import { CadastrosComponent } from "./demos/reactive-forms/cadastros/cadastros.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'sobre', component: SobreComponent },
  { path: 'cadastro', component: CadastrosComponent }
];
