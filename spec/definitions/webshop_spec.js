var settings = require('../helpers/settings.js');

describe('buying iPhone', function () {
    describe('when user selects iPhone', function () {
        it('he gets redirected to the billing-details page', function (done) {
            this.client
                .waitForExist('.title*=iPhone 6 White', settings.timeout)
                .element('.title*=iPhone 6 White')
                .element('..')
                .click('button*=Buy')
                .waitForExist('button*=Check out', settings.timeout)
                .url(function (err, res) {
                    expect(res.value).toMatch(/\/#\/billing-details$/);
                })
                .call(done);
        });
    });

    describe('when user provides his billing details', function () {
        it('he gets redirected to the order-summary page', function (done) {
            var billing = {
                firstName: 'Test',
                lastName: 'User',
                country: 'United Kingdom',
                city: 'London',
                address: '221B, Baker Street',
                zipCode: '12345',
                phone: '9998882245'
            };

            this.client
                .setValue('[name="firstName"]', billing.firstName)
                .setValue('[name="lastName"]', billing.lastName)
                .setValue('[name="address"]', billing.address)
                .setValue('[name="country"]', billing.country)
                .setValue('[name="city"]', billing.city)
                .setValue('[name="zipCode"]', billing.zipCode)
                .setValue('[name="phone"]', billing.phone)
                .click('button*=Check out')
                .waitForExist('h2*=Order summary', settings.timeout)
                .url(function (err, url) {
                    expect(url.value).toMatch(/\/#\/order-summary$/);
                })
                .call(done);
        });
    });

    describe('order summary page', function () {
        it('contains correct order total', function (done) {
            this.client
                .isVisible('//div[contains(@class, "row") and contains(., "iPhone 6 White") and contains(., "$450.00") and ancestor-or-self::div[@ng-repeat]]')
                .then(function (visibility) {
                    expect(visibility).toBe(true);
                })
                .isVisible('//div[contains(@class, "row") and descendant::div[contains(., "Total:")] and contains(., "$300.00") and not(contains(@class, "ng-scope"))]')
                .then(function (visibility) {
                    expect(visibility).toBe(true);
                })
                .call(done);
        });
    });
});