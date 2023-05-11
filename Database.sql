DROP database if exists BelgSoft;

CREATE database BelgSoft;

USE BelgSoft;

CREATE TABLE `Customer`
(
    customerId varchar(110) PRIMARY KEY NOT NULL,
    name       varchar(110)             NOT NULL,
    surname    varchar(110)             NOT NULL,
    phone      varchar(110),
    createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Table`
(
    tableId   varchar(110) PRIMARY KEY NOT NULL,
    number    varchar(110)             NOT NULL,
    customers int(2)                   NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Area
(
    areaId      varchar(110) PRIMARY KEY NOT NULL,
    name        varchar(110)             NOT NULL,
    description varchar(110)             NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE User
(
    userId      varchar(110) PRIMARY KEY NOT NULL,
    name        varchar(110)             NOT NULL,
    email       varchar(110)             NOT NULL UNIQUE,
    password    varchar(110)             NOT NULL,
    roleId      varchar(110)             NOT NULL,
    userTypeId  varchar(110)             NOT NULL,
    userStateId varchar(110)             NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Role
(
    roleId    varchar(110) PRIMARY KEY NOT NULL,
    name      varchar(110)             NOT NULL,
    value     varchar(110)             NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE UserType
(
    userTypeId varchar(110) PRIMARY KEY NOT NULL,
    name       varchar(110)             NOT NULL,
    type       varchar(110)             NOT NULL,
    createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE UserState
(
    userStateId varchar(110) PRIMARY KEY NOT NULL,
    name        varchar(110)             NOT NULL,
    state       varchar(110)             NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Profile
(
    profileId     varchar(110) PRIMARY KEY NOT NULL,
    userId        varchar(110)             NOT NULL,
    surname  varchar(20)              NOT NULL,
    middleName varchar(20)              NOT NULL,
    phone         varchar(20)              NOT NULL,
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User (userId)
);

CREATE TABLE Category
(
    categoryId  varchar(110) PRIMARY KEY NOT NULL,
    name        varchar(110)             NOT NULL,
    description varchar(110)             NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Menu
(
    menuId      varchar(110) PRIMARY KEY NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Category (categoryId),
    categoryId  varchar(110)             NOT NULL,
    name        varchar(110)             NOT NULL,
    price       varchar(110)             NOT NULL,
    status      varchar(110)             NOT NULL,
    description varchar(110)             NOT NULL,
    image       varchar(110)             NOT NULL,
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE OrderStatus
(
    orderStatusId varchar(110) PRIMARY KEY NOT NULL,
    name          varchar(110)             NOT NULL,
    description   varchar(110)             NOT NULL,
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Order`
(
    orderId       varchar(110) PRIMARY KEY NOT NULL,
    menuId        varchar(110)             NOT NULL,
    customerId    varchar(110),
    areaId        varchar(110)             NOT NULL,
    tableId       varchar(110)             NOT NULL,
    userId        varchar(110)             NOT NULL,
    orderStatusId varchar(110)             NOT NULL,
    price         int             NOT NULL,
    quantity      int             NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customer (customerId),
    FOREIGN KEY (orderStatusId) REFERENCES OrderStatus (orderStatusId),
    FOREIGN KEY (tableId) REFERENCES `Table` (tableId),
    FOREIGN KEY (userId) REFERENCES User (userId),
    FOREIGN KEY (menuId) REFERENCES Menu (menuId),
    FOREIGN KEY (areaId) REFERENCES Area (areaId),
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Role (roleId, name, value) VALUES ('1', 'Admin', 'admin');
INSERT INTO UserType (userTypeId, name, type) VALUES ('2', 'Free', 'Free');
INSERT INTO UserState (userStateId, name, state) VALUES ('3', 'Active', 'Active');
