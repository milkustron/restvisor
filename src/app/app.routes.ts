import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { WorkerComponent } from './pages/worker/worker.component';
import { WorkerProfileComponent } from './pages/worker-profile/worker-profile.component';
import { MenuOperationComponent } from './pages/menu-operation/menu-operation.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';
import { MenuClientComponent } from './pages/menu-client/menu-client.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'supervisor', component: SupervisorComponent },
    { path: 'worker', component: WorkerComponent },
    { path: 'worker-profile', component: WorkerProfileComponent },
    { path: 'menu-operation', component: MenuOperationComponent },
    { path: 'menu-edit', component: MenuEditComponent },
    { path: 'menu-client', component: MenuClientComponent },
];