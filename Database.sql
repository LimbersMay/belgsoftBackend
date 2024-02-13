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

CREATE TABLE OrderAudit
(
    auditId          varchar(110) PRIMARY KEY NOT NULL,
    orderId          varchar(110)             NOT NULL,
    oldStatusId      varchar(110)             NOT NULL,
    newStatusId      varchar(110)             NOT NULL,
    modifiedByUserId varchar(110)             NOT NULL,
    FOREIGN KEY (orderId) REFERENCES `Order` (orderId),
    FOREIGN KEY (oldStatusId) REFERENCES OrderStatus (orderStatusId),
    FOREIGN KEY (newStatusId) REFERENCES OrderStatus (orderStatusId),
    FOREIGN KEY (modifiedByUserId) REFERENCES User (userId),
    createdAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DELIMITER $$
CREATE TRIGGER `trgOrderStatusAudit`
    AFTER UPDATE ON `Order`
    FOR EACH ROW
    BEGIN
        IF NEW.orderStatusId <> OLD.orderStatusId THEN
            INSERT INTO OrderAudit (auditId, orderId, oldStatusId, newStatusId, modifiedByUserId) VALUES (UUID(), NEW.orderId, OLD.orderStatusId, NEW.orderStatusId, NEW.userId);
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `spCreateTable`(
    IN tableIdParam varchar(110),
    IN branchIdParam varchar(110),
    IN numberParam varchar(110),
    IN customersParam int
)
BEGIN
    INSERT INTO `Table` (tableId, branchId, number, customers)
    VALUES (tableIdParam, branchIdParam, numberParam, customersParam);

    SELECT tableId FROM `Table` WHERE tableId = tableIdParam;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `spGetAllUsers`(
    IN createdByUserIdParam varchar(110)
)
BEGIN
    SELECT
        userId, branchId, email, user.name,
        role.name AS role,
        userType.name AS userType,
        userState.name AS userState
    FROM
        User user
            INNER JOIN
        Role role ON user.roleId = role.roleId
            INNER JOIN
        UserType userType ON user.userTypeId = userType.userTypeId
            INNER JOIN
        UserState userState ON user.userStateId = userState.userStateId
    WHERE
            user.createdByUserId = createdByUserIdParam;
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `spUpdateTable`(
    IN tableIdParam varchar(110),
    IN branchIdParam varchar(110),
    IN numbers varchar(110),
    IN customersParam int
)
BEGIN
    UPDATE `Table`
    SET number = numbers, customers = customersParam
    WHERE tableId = tableIdParam AND branchId = branchIdParam;

    SELECT tableId FROM `Table` WHERE tableId = tableIdParam;
END$$

# SP
# After create a new order, we calculate the total price and the length of products in the order
DELIMITER $$
CREATE PROCEDURE `spCalculateOrderTotals`(
    IN orderIdParam VARCHAR(110)
)
BEGIN
    -- Update the order with the new values
    UPDATE `Order`
    SET price = (SELECT SUM(om.price * om.quantity) FROM OrderMenu om WHERE om.orderId = orderIdParam),
    quantity = (SELECT SUM(om.quantity) FROM OrderMenu om WHERE om.orderId = orderIdParam)
    WHERE orderId = orderIdParam;
END$$
DELIMITER ;


INSERT INTO Role (roleId, name, value)
VALUES ('1', 'ADMIN', 'admin');
INSERT INTO Role (roleId, name, value)
VALUES ('2', 'WAITER', 'waiter');
INSERT INTO UserType (userTypeId, name, type)
VALUES ('2', 'FREE', 'Free');
INSERT INTO UserType (userTypeId, name, type)
VALUES ('1', 'PAID', 'Paid');
INSERT INTO UserState (userStateId, name, state)
VALUES ('3', 'ACTIVE', 'Active');

INSERT INTO UserState (userStateId, name, state)
VALUES ('4', 'INACTIVE', 'Inactive');

INSERT INTO Branch (branchId, name, address, city, state, phone)
VALUES ('32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Tia de Kaua', 'Kaua 11 Centro', 'Kaua', 'Yucatan', '9851092492');

INSERT INTO Category (categoryId, branchId, name, description)
VALUES ('c1b6913e-78a1-407a-9e4b-49bb007b81c0', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Drink', 'Drink of the house');

INSERT INTO Category (categoryId, branchId, name, description)
VALUES ('da47c63f-196a-4240-bf58-846fd7f0931d', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Food', 'Food of the house');

INSERT INTO Category (categoryId, branchId, name, description)
VALUES ('5ff6a9c3-bfb4-4269-b8d6-22f620414199', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Dessert', 'Desserts of the house');

INSERT INTO Menu (menuId, categoryId, branchId, name, price, isAvailable, description, image)
VALUES ('bab910cf-bb45-41b0-89a1-45db90635e03', 'c1b6913e-78a1-407a-9e4b-49bb007b81c0', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Coca Cola', 20, 1, 'Coca Cola', 'https:-historia-de-la-coca-cola.jpg');

INSERT INTO Menu (menuId, categoryId, branchId, name, price, isAvailable, description, image)
VALUES ('2f1780e9-a7a3-4601-800b-6e845669faef', 'da47c63f-196a-4240-bf58-846fd7f0931d', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Frijol colado', 80, 1, 'Frijol colado especial', 'https://jameaperu.com/wp-content/uploads/2019/04/frejol-colado_700x465.jpg');

INSERT INTO Menu (menuId, categoryId, branchId, name, price, isAvailable, description, image)
VALUES ('d47249e4-26d1-474c-b853-070f95910eda', '5ff6a9c3-bfb4-4269-b8d6-22f620414199', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Flan', 43, 1, 'Flan regional', 'https://www.nicepng.com/png/detail/237-2378918_dile-a-tus-amigos-rebanada-de-flan-napolitano.png');

# Area: Area 1
INSERT INTO Area (areaId, branchId, name, description)
VALUES ('95552220-6beb-464a-ba18-c2a4963a174a', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Area 1', 'Area 1');

# Area: Palapa
INSERT INTO Area (areaId, branchId, name, description)
VALUES ('54ee6953-a784-4667-8e9a-5a6efb23e7dd', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', 'Palapa', 'Area trasera de la palapa');

# Mesa: 5
INSERT INTO `Table` (tableId, branchId, number, customers)
VALUES ('b6307076-c2f8-42d3-b906-338a65bdc6f7', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', '5', 5);

# Mesa: 2
INSERT INTO `Table` (tableId, branchId, number, customers)
VALUES ('5df02537-5c0d-459c-adaf-0d0c645735ea', '32c629ca-a1ab-40be-8a29-b1c007bd61f1', '2', 3);

INSERT INTO OrderStatus (orderStatusId, name, description) VALUES ('8c65c0c9-0244-4ba6-8e6b-498c089e0a49', 'PENDING', 'The order has been placed');

INSERT INTO OrderStatus (orderStatusId, name, description) VALUES ('d7de7cac-fb2a-468b-a760-c6089f35c453', 'PAID', 'The order has been paid');
