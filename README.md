### BELGSOFT PROJECT

## Description

Belgsoft is a project that aims to create a software that will help the Tia de Kaua restaurant to manage its orders and
its customers. The software will be able to manage the orders of the customers, the tables, the employees and the
products. The software will also be able to generate reports and statistics.

## Installation
`` git clone https://github.com/LimbersMay/belgsoftBackend.git ``

     cd belgsoftBackend 
    
     npm install 
    
     npm run dev

## API Usage
### Authentication
#### Login
```
POST /api/auth/login
```

##### Request
```
{
    "email": "
    "password": "
}
```

##### Response
```
{
    "token": "9d88asdsaduaudasda....",
    "user": {
        "id": 1,
        "name": "Maycon",
        "email": "
        "role": "admin",
        "created_at": "2021-05-31T20:54:48.000Z",
        "updated_at": "2021-05-31T20:54:48.000Z"
    }
}
```
