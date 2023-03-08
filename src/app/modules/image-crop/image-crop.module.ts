import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropComponent} from './image-crop.component';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {LightboxModule} from 'ngx-lightbox';
import {AngularCropperjsModule} from 'angular-cropperjs';
import {AngularDraggableModule} from 'angular2-draggable';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        ProgressbarModule.forRoot(),
        LightboxModule,
        ModalModule.forRoot(),
        AngularCropperjsModule,
        AngularDraggableModule
    ],
    declarations: [ImageCropComponent],
    exports: [ImageCropComponent],
    entryComponents: [ImageCropComponent]
})
export class ImageCropModule {
}
