
Features added:

- Featching and list the available Products and Articles/Inventories.
- Show Loader during data fetch/update and disable background clicks.
- Show availability of Products and Articles/Inventories.
- Collapse list of Products show productName, availableQuntity, Input field to add quantity to buy product & SALE button.
- Handling the unreliable API using Retry loops.
- Sale data section: Shows list of sale items(Products) with quantities.
- Show alert box when tends to sale more then Maximum quantity to sale based on calculations.
- Calculation for Available Quantity of product and update inventories.

Constraints:

- When the sale is being performed, there are chances that sales is created but artciles might not be updated with required quantity due to network unavailability/ api server down.
- Currently major code is on App.js, in future if there are more requirements then App.js can be spliited into specific files/components.
- If api is unavailable due to network constraint/api down then it will always keeps loading.

Future additions:

- Handling the sale logic at server side instead of client side to manage sale transacation better way.
- Improving page load performance at start.
- Login/Logout in system.
- Responsive layout.
- Show msg below loader based on cause of showing Loader (For example: Fetching data..., Some API issue msg, Product soled successfully , etc...).
- Options to add inventories.
- Show Toast/SnackBar msg message of alert box for warnings and for SALE successful/fail message.
- Different Tab for Sale's Section to show all sale/orders list including Date & Time duration.
- Reminder/Notifications message to add products/invetories in stock after some limits.
- Damaged products section.
- Product Categories section.
- Filters options. (availability, damaged, secondHand product, date & time, etc...)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
