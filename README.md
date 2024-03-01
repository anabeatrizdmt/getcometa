# The Bar

This project is a simple RESTful API for managing orders in a beer bar. It provides endpoints to list available beers, place orders, get the total bill amount, and pay the bill.

## Installation

To get started with this project, follow these steps:
1. Clone the repository to your local machine;
2. Navigate to the project directory;
3. Install dependencies using npm:
```
npm install
```

## Usage

To run the application, use the following command:
```
npm start
```
This will start the server, and you can then access the endpoints at `http://localhost:3001`.

## Testing
To run tests, use the following command:
```
npm test
```
This will execute the test suite and display the results.


## Endpoints
### Importing Endpoints
If you're using a tool like Insomnia to test the endpoints, you can **import the endpoints directly from a file**. Simply use the provided "TheBarEndpoints" file containing the exported Insomnia endpoints.

### - List Beers

Retrieve the list of available beers.
```
GET http://localhost:3001/beers/list
```

### - Place Order

Place a new order for a beer.
```
POST http://localhost:3001/orders/order
```
Request Body Example:

```json
{
    "customerName": "Amigo1",
    "amount": "19.50"
}
```

### - Get Bill
Get the total bill amount and bill breakdown by customer.

```
GET http://localhost:3001/orders/bill
```

### - Pay Bill
Pay the bill amount, either equally among all customers or individually for a specific customer.

```
POST http://localhost:3001/orders/pay
```
Request Body Example:

```json
{
    "scenario": "equally",
    "customerName": "Amigo1",
    "amount": 23.33
}
```
- scenario: Payment scenario (either "equally" or "by-customer").

