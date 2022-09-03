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
