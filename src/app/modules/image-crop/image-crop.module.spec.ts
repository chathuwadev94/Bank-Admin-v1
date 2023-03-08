import { ImageCropModule } from './image-crop.module';

describe('ImageCropModule', () => {
  let imageCropModule: ImageCropModule;

  beforeEach(() => {
    imageCropModule = new ImageCropModule();
  });

  it('should create an instance', () => {
    expect(imageCropModule).toBeTruthy();
  });
});
