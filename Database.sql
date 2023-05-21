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

CREATE TABLE OrderMenu
(
    orderMenuId varchar(110) PRIMARY KEY NOT NULL,
    orderId     varchar(110)             NOT NULL,
    menuId      varchar(110)             NOT NULL,
    quantity    float                      NOT NULL,
    price       float                      NOT NULL,
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
VALUES ('32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Tia de Kaua', 'Kaua 11 Centro', 'Kaua', 'Yucatan', '9851092492');

INSERT INTO Category (categoryId, branchId, name, description)
VALUES ('c1b6913e-78a1-407a-9e4b-49bb007b81c0', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Soda', 'Soda of the house');

INSERT INTO Menu (menuId, categoryId, branchId, name, price, isAvailable, description, image)
VALUES ('5aced550-a1e8-4643-a7c6-ab98954db2d2', 'c1b6913e-78a1-407a-9e4b-49bb007b81c0', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Coca Cola', 20, 1, 'Coca Cola', 'https:-historia-de-la-coca-cola.jpg');

INSERT INTO Area (areaId, branchId, name, description)
VALUES ('95552220-6beb-464a-ba18-c2a4963a174a', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Area 1', 'Area 1');

INSERT INTO `Table` (tableId, branchId, number, customers)
VALUES ('b6307076-c2f8-42d3-b906-338a65bdc6f7', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', '5', 5);

INSERT INTO OrderStatus (orderStatusId, name, description) VALUES ('8c65c0c9-0244-4ba6-8e6b-498c089e0a49', 'PENDING', 'Pending');
