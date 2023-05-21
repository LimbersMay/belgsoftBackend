import { Sequelize, DataType } from 'sequelize-typescript';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../utils";
import {
    UserSchema, CategorySchema, ProfileSchema,
    RoleSchema, UserTypeSchema, UserStateSchema,
    AreaSchema, TableSchema, MenuSchema, OrderSchema,
    OrderStatusSchema, BranchSchema, OrderMenuSchema
} from "./";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT.toString()),
    dialect: 'mysql',
    logging: false
});

const branchAttributes = {
    branchId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataType.STRING,
    },
    address: {
        type: DataType.STRING,
    },
    city: {
        type: DataType.STRING,
    },
    state: {
        type: DataType.STRING,
    },
    phone: {
        type: DataType.STRING,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const userAttributes = {
    userId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    createdByUserId: {
        type: DataType.STRING,
        allowNull: true,
        references: {
            model: UserSchema,
            key: 'userId'
        }
    },
    branchId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: BranchSchema,
            key: 'branchId'
        },
    },
    roleId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: RoleSchema,
            key: 'roleId'
        }
    },
    userTypeId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: UserTypeSchema,
            key: 'userTypeId'
        }
    },
    userStateId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: UserStateSchema,
            key: 'userStateId'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const areaAttributes = {
    areaId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    branchId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: BranchSchema,
            key: 'branchId'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const categoryAttributes = {
    categoryId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const menuAttributes = {
    menuId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    branchId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: BranchSchema,
            key: 'branchId'
        }
    },
    categoryId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: CategorySchema,
            key: 'categoryId'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    price: {
        type: DataType.STRING,
        allowNull: false
    },
    isAvailable: {
        type: DataType.BOOLEAN,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    },
    image: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const orderAttributes = {
    orderId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    branchId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: BranchSchema,
            key: 'branchId'
        }
    },
    customerName: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    },
    tableId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: TableSchema,
            key: 'tableId'
        }
    },
    areaId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: AreaSchema,
            key: 'areaId'
        }
    },
    userId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: UserSchema,
            key: 'userId'
        }
    },
    orderStatusId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: OrderStatusSchema,
            key: 'orderStatusId'
        }
    },
    price: {
        type: DataType.NUMBER,
    },
    quantity: {
        type: DataType.NUMBER,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const orderStatusAttributes = {
    orderStatusId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    }
}

const tableAttributes = {
    tableId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    branchId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: BranchSchema,
            key: 'branchId'
        }
    },
    number: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    customers: {
        type: DataType.NUMBER,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const roleAttributes = {
    roleId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    value: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const userTypeAttributes = {
    userTypeId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataType.STRING,
    },
    type: {
        type: DataType.STRING,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const userStateAttributes = {
    userStateId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataType.STRING,
    },
    state: {
        type: DataType.STRING,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const profileAttributes = {
    profileId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: UserSchema,
            key: 'userId'
        }
    },
    firstSurname: {
        type: DataType.STRING,
        allowNull: false,
    },
    secondSurname: {
        type: DataType.STRING,
        allowNull: false,
    },
    phone: {
        type: DataType.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const orderMenuAttributes = {
    orderMenuId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: OrderSchema,
            key: 'orderId'
        }
    },
    menuId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: MenuSchema,
            key: 'menuId'
        }
    },
    quantity: {
        type: DataType.NUMBER,
        allowNull: false,
    },
    price: {
        type: DataType.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

sequelize.addModels([
    BranchSchema, TableSchema, AreaSchema,
    UserSchema, CategorySchema, MenuSchema,
    OrderSchema, OrderStatusSchema, RoleSchema,
    UserTypeSchema, UserStateSchema, ProfileSchema,
    OrderMenuSchema
])

BranchSchema.init(branchAttributes, { sequelize, tableName: 'Branch' });
UserSchema.init(userAttributes, { sequelize, tableName: 'User' });
AreaSchema.init(areaAttributes, { sequelize, tableName: 'Area' });
TableSchema.init(tableAttributes, { sequelize, tableName: 'Table' });

OrderSchema.init(orderAttributes, { sequelize, tableName: 'Order' });
MenuSchema.init(menuAttributes, { sequelize, tableName: 'Menu' });

OrderMenuSchema.init(orderMenuAttributes, { sequelize, tableName: 'OrderMenu' });

OrderStatusSchema.init(orderStatusAttributes, { sequelize, tableName: 'OrderStatus' });
CategorySchema.init(categoryAttributes, { sequelize, tableName: 'Category' });

RoleSchema.init(roleAttributes, { sequelize, tableName: 'Role' });
UserTypeSchema.init(userTypeAttributes, { sequelize, tableName: 'UserType' });
UserStateSchema.init(userStateAttributes, { sequelize, tableName: 'UserState' });
ProfileSchema.init(profileAttributes, { sequelize, tableName: 'Profile' });

// relations user - role : 1 - 1
UserSchema.belongsTo(RoleSchema, { foreignKey: 'roleId', as: 'role'});
RoleSchema.hasOne(UserSchema, { foreignKey: 'roleId' });

// relations user - userState : 1 - 1
UserSchema.belongsTo(UserStateSchema, { foreignKey: 'userStateId', as: 'userState'});
UserStateSchema.hasOne(UserSchema, { foreignKey: 'userStateId' });

// relations user - userType : 1 - 1
UserSchema.belongsTo(UserTypeSchema, { foreignKey: 'userTypeId', as: 'userType'});
UserTypeSchema.hasOne(UserSchema, { foreignKey: 'userTypeId' });

// relation Category - Menu : 1 - N
// A category can have many menus associated with it
CategorySchema.hasMany(MenuSchema, { foreignKey: 'categoryId', as: 'menus' });
MenuSchema.belongsTo(CategorySchema, { foreignKey: 'categoryId', as: 'category' });

// Relation Order - Menu : N - N
// An order can have many menus associated with it
OrderSchema.belongsToMany(MenuSchema, { through: OrderMenuSchema, foreignKey: 'orderId', as: 'menus' });
MenuSchema.belongsToMany(OrderSchema, { through: OrderMenuSchema, foreignKey: 'menuId', as: 'orders' });

OrderSchema.hasMany(OrderMenuSchema, { foreignKey: 'orderId', as: 'orderMenus' });
OrderMenuSchema.belongsTo(OrderSchema, { foreignKey: 'orderId', as: 'order' });

MenuSchema.hasMany(OrderMenuSchema, { foreignKey: 'menuId', as: 'orderMenus' });
OrderMenuSchema.belongsTo(MenuSchema, { foreignKey: 'menuId', as: 'menu' });

export default sequelize;
