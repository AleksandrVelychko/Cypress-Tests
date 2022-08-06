// This file contain the info how the page object pattern is used

const { onDatepickerPage } = require("../support/page_objects/datepickerPage");
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage");
const { navigateTo } = require("../support/page_objects/navigationPage");
const { onSmartTablePage } = require("../support/page_objects/smartTable");

describe('Test with page object', () => {

  beforeEach('Open application', () => {
    cy.openHomePage()
  })

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  })

  it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Alex', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(1)
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Alex', 'Vens')
    onSmartTablePage.updateAgeByFirstName('Alex', '26')
    onSmartTablePage.deleteRowByIndex(1)
  })
})