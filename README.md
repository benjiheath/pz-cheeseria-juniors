1. When clicking on a Cheese card, open a [Dialog](https://material-ui.com/components/dialogs/#dialog) that contains all the details of the card, including the item's **description**.

2. Add a **Purchase** button to the Cart (In the sliding view that opens when you click the 'Cart' button). Clicking on the **Purchase** button will send all items in the cart to the server (backend) and store them for later use (You are not required to use a Database in this exercise, but you may do so if you wish).

3. Show all recently purchased items when clicking on the "Recent Purchases" button on the top left of the page. You may choose to display those items in a Drawer, a Dialog or any other control you see fit. Note that the recent purchased items **must** be retrieved from the server.

4. Add a UI automation test that performs the Purchase action you implemented as part of Feature #2. For this test case you will add two separate items to the cart and click on the **Purchase** button you have added as part of Feature #2.
   For this exercise we will be using the Cypress.io tool-set. You will find code to get you started in the 'e2e' folder.
   **_Note: You are free to add any selectors to your client code which may be required by the e2e tests._**

## Important Scripts

In the project directory, you can run:

### `npm install`

Installs package dependencies (node v14.15.0)

### `npm start`

Builds and runs the app in the development mode.\
The browser will be automatically launched under [http://localhost:9000](http://localhost:9000).
The server backend will start listening on [http://localhost:3000](http://localhost:3000)

### Cypress.io

You will open the e2e folder, then run following commands to get started

```bash
npm install
npm test
```
