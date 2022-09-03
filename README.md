The proposing of this repo is centralizing all the resources, documentation and code for the homework.


## Folders

### /documentation:
-

### /client:
- Made in react
### /server:
- Spring boot graphql server
- Connected to a nosql database

### Milestones:
1. Clean apps running.
> - Get the basic clean react app with a custom welcome message.
> - Get a basic spring boot running with a test endpoint

2. Cryptocurrency basic descriptions.

> - Populate the database with the cryptocurrencies {code, name, description}
> - Create the query for graphql
> - Make a search bar that looks for a currency and displays information about it, should take the information from
    > the query above.

- [x] Update the documentation
  to [this document](https://docs.google.com/document/d/1oIKNWWjSGbVWjsM8AbSm8hMuyo-y9KqhIeiBaR6DfLI/edit?usp=sharing)
- [ ] Design the layout of the section.
- [ ] Make a diagram of the persistence layer.
- [x] Gather a list of all the available currencies.

This is an example to get the daily value of bitcoin in USD
`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=EZJLEL2H87V8ZL16`

##Google Doc
Cryptocurrency

Visual


Desc
Automatically track crypto digital assets, display the value of multiple crypto coins. Users will be able to see a graph displaying the current market value of their pre-selected crypto types.

Front-end
 
Chart Component: Display a cryptocurrency line graph. Display multiple crypto currency types on the same graph
 
Gallery Component: Display a grid of multiple types of crypto to choose from. Currencies are shown inside of individual containers in a gallery view. The currencies listed will be selected from the user via the search bar component.
 
Search bar Component: Upon clicking in the search bar, a drop down list of available crypto currencies will be displayed to the user. Once a user has selected a currency type, it will be displayed as a gallery item and populated to the chart component.
 
Sidebar component: Can toggle open or closed. Contains navigation links to other pages of the application.
 
Back-end
Save a user's selected currency types. 
Delete a currency type
Retrieve saved currency types
Connect to crypto currency API

Logic
Navigate to the card from the navbar crypto option.
User can click on one or more crypto currencies and populate to graph
User can remove a currency type from graph
Currency is also added to gallery view 
When user selects a currency, it is added to the database
User can remove a currency from database
User can navigate away from page via the sidebar





