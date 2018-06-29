import { browser, by, element } from 'protractor';

describe('restaurant App', () => {

  // beforeEach(() => {
  //   page = new AppPage();
  // });
  it('should have a title', () => {
    expect(browser.getTitle()).toEqual("Grub Finder");
  });
});
