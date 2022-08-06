/// <reference types="cypress" /> 

const { table, clear } = require("console");

describe('First suite', () => {
    
     it('First test', () => {
          {
               cy.visit('/');
               cy.contains('Forms').click();
               cy.contains('Form Layouts').click();
               //by Tag Name
               cy.get('input');

               //by Id
               cy.get('#inputEmail1');

               //by Class Name
               cy.get('.input-full-width');

               // by Attribute name
               cy.get('[placeholder]');

               // by Attribute name and value
               cy.get('[placeholder="Email"]');

               // by Class value
               cy.get('[class="input-full-width size-medium shape-rectangle"]');

               // by Tag name and Attribute with value
               cy.get('input[placeholder="Email"]');

               //by Two different Attributes (could be added more attributes)
               cy.get('[placeholder="Email"][nbinput]');

               //by tag name, attribute with value, ID and class name
               cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

               // the most recommended way by Cypress (use own data attribute)
               cy.get('[data-cy="imputEmail1"]');
          }
     }) 

     it('Second test', () => {
          cy.visit('/');
          cy.contains('Forms').click();
          cy.contains('Form Layouts').click();

          cy.get('[data-cy="signInButton"]');
          cy.contains('Sign in');
          cy.contains('[status="warning"]', 'Sign in');
          cy.get('#inputEmail3')
          .parents('form')
          .find('button')
          .should('contain', 'Sign in')
          .parents('form')
          .find('nb-checkbox').click();
          cy.get('nb-card', 'Horizontal form').find('[type="email"]');
     })

     it('then and wrap methods', () => {
          cy.visit('/');
          cy.contains('Forms').click();
          cy.contains('Form Layouts').click();

          // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
          // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
          // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
          // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

          // nested test to define equal values using Chai syntax and JQuery syntax
          cy.contains('nb-card', 'Using the Grid').then( firstForm => {
               const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
               const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
               expect(emailLabelFirst).to.eql('Email');
               expect(passwordLabelFirst).to.eql('Password');

               cy.contains('nb-card', 'Basic form').then( secondForm => {
                    const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
                    expect(passwordLabelFirst).to.eql(passwordLabelSecond);

                    // change context back to Cypress assertions using wrap() method
                    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password');
               })
          })
          
     })

     it('invoke command', () => {
          cy.visit('/');
          cy.contains('Forms').click();
          cy.contains('Form Layouts').click();

          cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
               expect(text).to.eql('Email address');
          }); // in this example we grab some text => add text as the func parameter => use it as we need

          cy.contains('nb-card', 'Basic form')
          .find('nb-checkbox')
          .click()
          .find('.custom-checkbox')
          .invoke('attr', 'class')
          .should('contain', 'checked')
     })

     it('assert property', () => {

          function selectDayFromCurrent(day) {
                    
               let date = new Date(); // get current date
               date.setDate(date.getDate() + day) // getDate => get number of the current day (e.g. 26)
               let futureDay = date.getDate()
               let futureMonth = date.toLocaleString('default', {month: 'short'})
               let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

               cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                    if(!dateAttribute.includes(futureMonth)) {
                         cy.get('[data-name="chevron-right"]').click()
                         selectDayFromCurrent(day);
                    } else {
                         cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
               })

               return dateAssert
          }

          cy.visit('/');
          cy.contains('Forms').click();
          cy.contains('Datepicker').click();

          cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
               cy.wrap(input).click()
               let dateAssert = selectDayFromCurrent(1);
               
               //cy.get('nb-calendar-day-picker').contains('20').click()
               cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
          })
     })

     it('radio button', () => {
          cy.visit('/');
          cy.contains('Forms').click();
          cy.contains('Form Layouts').click();

          cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
               cy.wrap(radioButtons)
               .first()
               .check({force: true})
               .should('be.checked')

               cy.wrap(radioButtons)
               .eq(1)
               .check({force: true})
               
               cy.wrap(radioButtons)
               .first()
               .should('not.be.checked')

               cy.wrap(radioButtons)
               .eq(2)
               .should('be.disabled')
          })
     })

     it('check boxes', () => {
          cy.visit('/');
          cy.contains('Modal & Overlays').click();
          cy.contains('Toastr').click();

          cy.get('[type="checkbox"]').eq(0).check({force: true});
          cy.get('[type="checkbox"]').eq(1).click({force: true});
          /*
          method check() can't uncheck checked checkbox. We can use click() method instead
          for this type of element preferebly to use check() method
          */
     })

     it('list and dropdown', () => {
          cy.visit('/');

          // 1
          /*
          cy.get('nav nb-select').click();
          cy.get('.options-list').contains('Dark').click();
          cy.get('nav nb-select').should('contain', 'Dark');
          cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');
          */

          // 2
          cy.get('nav nb-select').then(dropdown => {
               cy.wrap(dropdown).click()
               cy.get('.options-list nb-option').each( (listItem , index) => {
                    const itemText = listItem.text().trim()

                    const colors = {
                         "Light": "rgb(255, 255, 255)",
                         "Dark": "rgb(34, 43, 69)",
                         "Cosmic": "rgb(50, 50, 89)",
                         "Corporate": "rgb(255, 255, 255)"
                    }

                    cy.wrap(listItem).click();
                    cy.wrap(dropdown).should('contain', itemText);
                    cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
                    if (index < 3) {
                         cy.wrap(dropdown).click()
                    }
               })
          })
     })

     it('web tables', () => {
          cy.visit('/');
          cy.contains('Tables & Data').click();
          cy.contains('Smart Table').click();

          // 1 "Edit table by clicking on the Edit icon => Make changes => Save changes by clicking Done icon"
          cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
               cy.wrap(tableRow).find('.nb-edit').click()
               cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
               cy.wrap(tableRow).find('.nb-checkmark').click()
               cy.wrap(tableRow).find('td').should('contain', '25')
          })

          // 2 Add new row with values and make the assertions by the column order
          cy.get('thead').find('.nb-plus').click()
          cy.get('thead').find('tr').eq(2).then( tableRow => {
               cy.wrap(tableRow).find('[placeholder="First Name"]').type('Alex')
               cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Merses')
               cy.wrap(tableRow).find('.nb-checkmark').click()
          }) 
          cy.get('tbody tr').first().find('td').then(tableColumns => {
               cy.wrap(tableColumns).eq(2).should('contain', 'Alex')
               cy.wrap(tableColumns).eq(3).should('contain', 'Merses')
          })

          // 3 "Search function scenario"

          const age = [20, 30, 40, 200];

          cy.wrap(age).each( age => {
               cy.get('thead [placeholder="Age"]').clear().type(age)
               cy.wait(500)
               cy.get('tbody tr').each(tableRow => {
                    if(age == 200) {
                         cy.wrap(tableRow).should('contain', 'No data found')
                    } else {
                         cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                    }
          })
          })
          /*
          cy.get('thead [placeholder="Age"]').type('20')
          cy.wait(500)
          cy.get('tbody tr').each(tableRow => {
               cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
          })
          */
     })

     it('tooltip', () => {
          cy.visit('/');
          cy.contains('Modal & Overlays').click();
          cy.contains('Tooltip').click();

          cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
          cy.get('nb-tooltip').should('contain', 'This is a tooltip')
     })

     it.only('dialog box', () => {
          cy.visit('/');
          cy.contains('Tables & Data').click();
          cy.contains('Smart Table').click();
          // Case => "Get browser confirm window to confirm or decline changes"
          // 1
          /*
          cy.get('tbody tr').first().find('.nb-trash').click()
          cy.on('window:confirm', (confirm) => {
               expect(confirm).to.equal('Are you sure you want to delete?')
          })
          */
          // 2 (Preferable way to use)

          // const stub = cy.stub()
          // cy.on('window:confirm', stub)
          // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
          //      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
          // })

          // 3 

          cy.get('tbody tr').first().find('.nb-trash').click()
          cy.on('window:confirm', () => false)
     })
     
});