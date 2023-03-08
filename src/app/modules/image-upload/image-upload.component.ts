import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../../core/services';
import {Lightbox} from 'ngx-lightbox';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ImageCropComponent} from '../image-crop/image-crop.component';
import {EventEmitterService} from '../../core/services';
import {ImageService} from '../../api-services/internal';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

    @Input() config: any;
    @Input() imageUrl: any;
    @Output() onFileUploadEvent: EventEmitter<any> = new EventEmitter();
    bsModalRef: BsModalRef;
    public uploadedUrl: any = null;
    public uploadSpinner: boolean;

    constructor(private httpService: HttpService, private _lightbox: Lightbox, private modalService: BsModalService,
                private eventEmit: EventEmitterService, private fileManageService: ImageService) {
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.config.image) {
                this.uploadedUrl = this.config.imgUrl + this.config.image;
            } else {
                this.uploadedUrl = null;
            }
        }, 0);
    }

    onChooseFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const url = e.target.result;
                this.openImageCropModal(url, event.target.files[0]);
                event.target.value = '';
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private openImageCropModal(files: any, firstFile: any) {
        const modalConfig: any = {
            class: 'modal-lg background-transparent',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        const file = {
            file: files,
            f_File: firstFile,
            ratio: this.config.ratio || 0,
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(ImageCropComponent, modalConfig);
        this.bsModalRef.content.file = Object.assign(file, {} || {});
        this.bsModalRef.content.onClose.subscribe(result => {
            if (result) {
                this.uploadFile(result);
            } else {
                this.uploadSpinner = false;
            }
        });
        this.eventEmit.onBroadcastUpdatedRatio(file);
    }

    private uploadFile(result: any) {
        const req = {
            file: result,
            type: 'IMAGE'
        };
        this.fileManageService.upload(req).then((response: any) => {
            if (response) {
                this.uploadedUrl = this.config.imgUrl + response.fileName;
                if (response) {
                    this.onFileUploadEvent.emit({type: 'uploaded', data: response.fileName});
                } else {
                    this.onFileUploadEvent.emit({type: 'error', data: null});
                }
            }
            this.uploadSpinner = false;
        });
    }

    open(index: number): void {
        const arr = [
            {
                src: this.uploadedUrl,
                thumb: this.uploadedUrl
            }
        ];
        this._lightbox.open(arr, index);
    }

    close(): void {
        this._lightbox.close();
    }

    onDeleteImg() {
        this.uploadedUrl = null;
        this.onFileUploadEvent.emit({type: 'deleted', data: null});
    }

}
