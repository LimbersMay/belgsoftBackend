DROP database if exists BelgSoft;

CREATE database BelgSoft;

USE BelgSoft;

CREATE TABLE `Customer` (
    customerId varchar (110) PRIMARY KEY NOT NULL,
    name varchar (110) NOT NULL,
    surname varchar (110) NOT NULL,
    phone varchar (110),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Table` (
    tableId varchar (110) PRIMARY KEY NOT NULL,
    number varchar (110) NOT NULL,
    customers int (2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Area (
    areaId varchar (110) PRIMARY KEY NOT NULL,
    name varchar (110) NOT NULL,
    description varchar (110) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE User (
    userId varchar (110) PRIMARY KEY NOT NULL,
    name varchar (110) NOT NULL,
    surname varchar (110) NOT NULL,
    email varchar (110) NOT NULL,
    password varchar (110) NOT NULL,
    role varchar (110) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Category (
    categoryId varchar (110) PRIMARY KEY NOT NULL,
    name varchar (110) NOT NULL,
    description varchar (110) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Menu (
    menuId varchar (110) PRIMARY KEY NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId),
    categoryId varchar (110) NOT NULL,
    name varchar (110) NOT NULL,
    price varchar (110) NOT NULL,
    status varchar (110) NOT NULL,
    description varchar (110) NOT NULL,
    image varchar (110) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE OrderStatus (
    orderStatusId varchar (110) PRIMARY KEY NOT NULL,
    name varchar (110) NOT NULL,
    description varchar (110) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Order` (
    orderId varchar (110) PRIMARY KEY NOT NULL,
    customerId varchar (110) NOT NULL,
    tableId varchar (110) NOT NULL,
    userId varchar (110) NOT NULL,
    orderStatusId varchar (110) NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customer(customerId),
    FOREIGN KEY (orderStatusId) REFERENCES OrderStatus(orderStatusId),
    FOREIGN KEY (tableId) REFERENCES `Table`(tableId),
    FOREIGN KEY (userId) REFERENCES User(userId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
