/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
  /* This is our first test - it tests to make sure that the
   * allFeeds variable has been defined and that it is not
   * empty. Experiment with this before you get started on
   * the rest of this project. What happens when you change
   * allFeeds in app.js to be an empty array and refresh the
   * page?
   */
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });
    
    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('should have each feed URL defined and are not empty.', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* This test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('should have each feed name defined and are not empty.', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });
  
  /* Describes test suite for "The menu" */
  describe('The menu', function() {
    const BODY = $('body'),
          MENU_BUTTON = $('.menu-icon-link');

    /* This test ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('should hide the menu by default.', function() {
      expect(BODY.hasClass('menu-hidden')).toBeTruthy();
    });

    /* This test ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('should show the menu when the hamburger/menu icon is clicked.', function() {
      MENU_BUTTON.click();
      expect(BODY.hasClass('menu-hidden')).toBeFalsy();

      MENU_BUTTON.click();
      expect(BODY.hasClass('menu-hidden')).toBeTruthy();
    });
  });

  /* Describes test suite for "Initial Entries" */
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
  
    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('should loadFeed and render to .feed container.', function() {
      expect($('.feed .entry').length).not.toBe(0);
    });
  });
  /* Descrbies test suite for "New Feed Selection" */
  describe('New Feed Selection', function() {
    var initialFeedHTML;

    beforeEach(function(done) {
      loadFeed(0, function() {
        initialFeedHTML = $('.feed').html();

        loadFeed(1, function() {
          done();
        });
      });
    });

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('should load new feed.', function(done) {
      var newFeedHTML = $('.feed').html();
      expect(newFeedHTML).not.toBe(initialFeedHTML);
      done();
    });
  });
}());
