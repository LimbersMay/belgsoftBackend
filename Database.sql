DROP database if exists BelgSoft;

CREATE database BelgSoft;

USE BelgSoft;

CREATE TABLE Branch
(
    branchId  varchar(110) PRIMARY KEY NOT NULL,
    name      varchar(25)              NOT NULL,
    address   varchar(40)              NOT NULL,
    city      varchar(15)              NOT NULL,
    state     varchar(15)              NOT NULL,
    phone     varchar(20)              NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Table`
(
    tableId   varchar(110) PRIMARY KEY NOT NULL,
    branchId  varchar(110)             NOT NULL,
    number    varchar(110) UNIQUE      NOT NULL,
    customers int                      NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Area
(
    areaId      varchar(110) PRIMARY KEY NOT NULL,
    branchId    varchar(110)             NOT NULL,
    name        varchar(110)             NOT NULL,
    description varchar(110)             NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
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

CREATE TABLE User
(
    userId          varchar(110) PRIMARY KEY NOT NULL,
    createdByUserId varchar(110),
    branchId        varchar(110)             NOT NULL,
    name            varchar(110)             NOT NULL,
    email           varchar(110)             NOT NULL UNIQUE,
    password        varchar(110)             NOT NULL,
    roleId          varchar(110)             NOT NULL,
    userTypeId      varchar(110)             NOT NULL,
    userStateId     varchar(110)             NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
    FOREIGN KEY (roleId) REFERENCES Role (roleId),
    FOREIGN KEY (userTypeId) REFERENCES UserType (userTypeId),
    FOREIGN KEY (userStateId) REFERENCES UserState (userStateId),
    FOREIGN KEY (createdByUserId) REFERENCES User (userId),
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Profile
(
    profileId  varchar(110) PRIMARY KEY NOT NULL,
    userId     varchar(110)             NOT NULL,
    surname    varchar(20)              NOT NULL,
    middleName varchar(20)              NOT NULL,
    phone      varchar(20)              NOT NULL,
    createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User (userId)
);

CREATE TABLE Category
(
    categoryId  varchar(110) PRIMARY KEY NOT NULL,
    branchId    varchar(110)             NOT NULL,
    name        varchar(110)             NOT NULL,
    description varchar(110)             NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Menu
(
    menuId      varchar(110) PRIMARY KEY NOT NULL,
    categoryId  varchar(110)             NOT NULL,
    branchId    varchar(110)             NOT NULL,
    name        varchar(110)             NOT NULL,
    price       int                      NOT NULL,
    isAvailable BOOLEAN                  NOT NULL,
    description varchar(110)             NOT NULL,
    image       varchar(110)             NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
    FOREIGN KEY (categoryId) REFERENCES Category (categoryId),
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
    areaId        varchar(110)             NOT NULL,
    tableId       varchar(110)             NOT NULL,
    userId        varchar(110)             NOT NULL,
    branchId      varchar(110)             NOT NULL,
    orderStatusId varchar(110)             NOT NULL,
    customerName  varchar(110),
    price         int                      NOT NULL,
    quantity      int                      NOT NULL,
    FOREIGN KEY (branchId) REFERENCES Branch (branchId),
    FOREIGN KEY (orderStatusId) REFERENCES OrderStatus (orderStatusId),
    FOREIGN KEY (tableId) REFERENCES `Table` (tableId),
    FOREIGN KEY (userId) REFERENCES User (userId),
    FOREIGN KEY (areaId) REFERENCES Area (areaId),
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Order_Menu
(
    orderMenuId varchar(110) PRIMARY KEY NOT NULL,
    orderId     varchar(110)             NOT NULL,
    menuId      varchar(110)             NOT NULL,
    quantity    int                      NOT NULL,
    FOREIGN KEY (orderId) REFERENCES `Order` (orderId),
    FOREIGN KEY (menuId) REFERENCES Menu (menuId),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Role (roleId, name, value)
VALUES ('1', 'ADMIN', 'admin');
INSERT INTO UserType (userTypeId, name, type)
VALUES ('2', 'FREE', 'Free');
INSERT INTO UserState (userStateId, name, state)
VALUES ('3', 'ACTIVE', 'Active');

INSERT INTO Branch (branchId, name, address, city, state, phone)
VALUES ('1', 'Tia de Kaua', 'Kaua 11 Centro', 'Kaua', 'Yucatan', '9851092492');

INSERT INTO Category (categoryId, branchId, name, description)
VALUES ('1', '1', 'Soda', 'Soda of the house');

INSERT INTO OrderStatus (orderStatusId, name, description) VALUES ('8c65c0c9-0244-4ba6-8e6b-498c089e0a49', 'PENDING', 'Pending');

INSERT INTO Branch (branchId, name, address, city, state, phone)
VALUES ('ad186eeb-ee7c-4a0a-b4d5-a22f8ed7d8e5', 'Tia de Kaua', 'Kaua 11 Centro', 'Kaua', 'Yucatan', '9851092492');
