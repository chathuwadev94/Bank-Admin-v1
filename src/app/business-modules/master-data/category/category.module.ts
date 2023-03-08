import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategorySetStatusComponent} from './category-set-status/category-set-status.component';
import {CategoryComponent} from './category.component';
import {DataGridModule} from '../../../modules/data-grid';
import {FormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../../shared';
import {AngularDraggableModule} from 'angular2-draggable';
import {DirectivesModule} from '../../../directives/directives.module';
import {ImageUploadModule} from '../../../modules/image-upload';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [CategoryComponent, CategoryListComponent, CategoryDetailsComponent, CategoryCreateComponent,
        CategorySetStatusComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        DataGridModule,
        FormsModule,
        SharedPipesModule,
        ModalModule.forRoot(),
        AngularDraggableModule,
        DirectivesModule,
        ImageUploadModule
    ],
    entryComponents: [CategoryDetailsComponent, CategoryCreateComponent, CategorySetStatusComponent]
})
export class CategoryModule {
}
