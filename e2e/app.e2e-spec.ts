import { MgwSlideShowPage } from './app.po';

describe('mgw-slide-show App', () => {
  let page: MgwSlideShowPage;

  beforeEach(() => {
    page = new MgwSlideShowPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
