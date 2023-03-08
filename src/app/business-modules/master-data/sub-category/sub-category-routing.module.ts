import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from '../category/category.component';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {SubCategoryListComponent} from './sub-category-list/sub-category-list.component';
import {SubCategoryComponent} from './sub-category.component';


const routes: Routes = [{
    path: '',
    component: SubCategoryComponent,
    data: {
        title: 'sub-category'
    },
    children: [
        { path: 'sub-category-list', component: SubCategoryListComponent },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
