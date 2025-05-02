import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { WorkerComponent } from './pages/worker/worker.component';
import { WorkerProfileComponent } from './pages/worker-profile/worker-profile.component';
import { MenuOperationComponent } from './pages/menu-operation/menu-operation.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';
import { MenuClientComponent } from './pages/menu-client/menu-client.component';
import { authGuard } from './core/auth.guard';
import { supervisorGuard } from './core/supervisor.guard';
import { workerGuard } from './core/worker.guard';
import {PruebasComponent} from "./shared/pruebas/pruebas.component";

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'supervisor', component: SupervisorComponent, canActivate: [authGuard, supervisorGuard] },
    { path: 'worker', component: WorkerComponent, canActivate: [authGuard, workerGuard] },
    { path: 'worker-profile', component: WorkerProfileComponent },
    { path: 'menu-operation', component: MenuOperationComponent },
    { path: 'menu-edit', component: MenuEditComponent },
    { path: 'menu-client', component: MenuClientComponent },
    { path: 'pruebas', component: PruebasComponent},
];