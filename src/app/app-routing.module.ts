import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {GuardService} from './core/services';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        loadChildren: () => import('./business-modules/business.module').then(m => m.BusinessModule),
         canActivate: [GuardService]
    },
    {
        path: '',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
