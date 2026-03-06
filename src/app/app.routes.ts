import { Routes } from '@angular/router';
import { PlantasDetall } from './plantas/plantas-detall/plantas-detall';
import { PlantasList } from './plantas/plantas-list/plantas-list';
import { Home } from './components/home/home';
import { PlantasTable } from './plantas/plantas-table/plantas-table';
import { RegistrosTable } from './registros/registros-table/registros-table';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { userGuardGuard } from './guards/user-guard-guard';
import { AdministradorPlantas } from './plantas/administrador-plantas/administrador-plantas';

export const routes: Routes = [
    {path: 'home',component: Home},
    {path: 'plantas',canActivate: [userGuardGuard],component: PlantasList},
    {path: 'plantas_table',component: PlantasTable},
    {path: 'registros_table',component: RegistrosTable},
    {path: 'plantas/:search',component: PlantasList},
    {path: 'planta/:id',component: PlantasDetall},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    { path: 'administrador', component: AdministradorPlantas },
    {path: '**', pathMatch: 'full',redirectTo: 'home'}
];
