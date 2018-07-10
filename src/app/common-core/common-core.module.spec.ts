import { CommonCoreModule } from './common-core.module';

describe('CommonCoreModule', () => {
  let commonCoreModule: CommonCoreModule;

  beforeEach(() => {
    commonCoreModule = new CommonCoreModule();
  });

  it('should create an instance', () => {
    expect(commonCoreModule).toBeTruthy();
  });
});
