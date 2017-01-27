import { ConnectedFarmPage } from './app.po';

describe('connected-farm App', function() {
  let page: ConnectedFarmPage;

  beforeEach(() => {
    page = new ConnectedFarmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
