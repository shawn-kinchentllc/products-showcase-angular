import { ProductsShowcasePage } from './app.po';

describe('products-showcase App', () => {
  let page: ProductsShowcasePage;

  beforeEach(() => {
    page = new ProductsShowcasePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
