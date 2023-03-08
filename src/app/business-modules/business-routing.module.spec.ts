import { BusinessRoutingModule } from './business-routing.module';

describe('BusinessRoutingModule', () => {
  let businessRoutingModule: BusinessRoutingModule;

  beforeEach(() => {
    businessRoutingModule = new BusinessRoutingModule();
  });

  it('should create an instance', () => {
    expect(businessRoutingModule).toBeTruthy();
  });
});
