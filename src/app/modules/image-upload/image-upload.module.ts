import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploadComponent} from './image-upload.component';
import {LightboxModule} from 'ngx-lightbox';
import {ImageCropModule} from '../image-crop';
import {AngularCropperjsModule} from 'angular-cropperjs';
import {AngularDraggableModule} from 'angular2-draggable';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        LightboxModule,
        AngularCropperjsModule,
        ModalModule.forRoot(),
        ImageCropModule,
        AngularDraggableModule
    ],
    declarations: [ImageUploadComponent],
    exports: [ImageUploadComponent],
})
export class ImageUploadModule {
}
