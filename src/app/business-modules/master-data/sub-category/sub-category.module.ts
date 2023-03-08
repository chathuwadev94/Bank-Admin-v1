import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubCategoryRoutingModule} from './sub-category-routing.module';
import {SubCategoryComponent} from './sub-category.component';
import {SubCategoryListComponent} from './sub-category-list/sub-category-list.component';
import {SubCategoryDetailsComponent} from './sub-category-details/sub-category-details.component';
import {SubCategoryCreateComponent} from './sub-category-create/sub-category-create.component';
import {SubCategorySetStatusComponent} from './sub-category-set-status/sub-category-set-status.component';
import {DataGridModule} from '../../../modules/data-grid';
import {FormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../../shared';
import {AngularDraggableModule} from 'angular2-draggable';
import {DirectivesModule} from '../../../directives/directives.module';
import {ImageUploadModule} from '../../../modules/image-upload';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [SubCategoryComponent, SubCategoryListComponent, SubCategoryDetailsComponent, SubCategoryCreateComponent,
        SubCategorySetStatusComponent],
    imports: [
        CommonModule,
        SubCategoryRoutingModule,
        DataGridModule,
        FormsModule,
        SharedPipesModule,
        ModalModule.forRoot(),
        AngularDraggableModule,
        DirectivesModule,
        ImageUploadModule
    ],
    entryComponents: [SubCategoryDetailsComponent, SubCategoryCreateComponent, SubCategorySetStatusComponent]
})
export class SubCategoryModule {
}
