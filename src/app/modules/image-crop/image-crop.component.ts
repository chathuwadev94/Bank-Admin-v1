import {Component, OnInit, ViewChild} from '@angular/core';
import {CropperComponent} from 'angular-cropperjs';
import {Subject} from 'rxjs';
import {EventEmitterService} from '../../core/services';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-image-crop',
    templateUrl: './image-crop.component.html',
    styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit {

    @ViewChild('angularCropper', {static: false}) public angularCropper: CropperComponent;
    public onClose: Subject<boolean>;
    public file: any = {};
    public cropperOptions: any = {};
    public clicked: boolean;
    croppedImage = null;
    scaleValX = 1;
    scaleValY = 1;
    public fileFormat: any;
    private imageType: string;

    constructor(public bsModalRef: BsModalRef, private emitter: EventEmitterService) {
        this.onClose = new Subject();
        emitter.updateRatio.subscribe((file: any) => {
            this.cropperOptions.aspectRatio = file.ratio;
        });
        this.cropperOptions = {
            dragMode: 'move',
            aspectRatio: 1.67,
            autoCrop: true,
            movable: true,
            zoomable: true,
            scalable: true,
            autoCropArea: 1,
            scaleX: 1,
            scaleY: 1
        };
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.file.f_File) {
                const fileType = this.file.f_File.type.toString();
                this.imageType = fileType;
            }
        }, 0);
    }

    onCloseModal(response: any) {
        this.onClose.next(false);
        this.bsModalRef.hide();
    }

    reset() {
        this.angularCropper.cropper.reset();
    }

    rotate() {
        this.angularCropper.cropper.reset();
        this.angularCropper.cropper.rotate(90);
    }

    move(x, y) {
        this.angularCropper.cropper.move(x, y);
    }

    save() {
        if (this.fileFormat) {
            this.onClose.next(this.fileFormat);
        }
        this.bsModalRef.hide();
    }

    preview() {
        let fileName = this.file.f_File.name;
        if (this.file.fileName) {
            fileName = this.file.fileName;
        }
        const croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL((this.imageType || 'image/jpeg'),
            (100 / 100));
        this.croppedImage = croppedImgB64String;
        const blob = this.dataURItoBlob(this.croppedImage);
        this.fileFormat = new File([blob], fileName, {type: (this.imageType || 'image/jpeg')});
    }

    private dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    }

}
