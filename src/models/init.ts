import { Sequelize, DataType } from 'sequelize-typescript';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../utils/secrets";
import {RoleSchema} from "./role.schema";
import {UserTypeSchema} from "./userType.schema";
import {UserStateSchema} from "./userState.schema";
import {CategorySchema} from "./category.schema";
import {CustomerSchema} from "./customer.schema";
import TableSchema from "./table.schema";
import UserSchema from "./user.schema";
import {OrderStatusSchema} from "./orderStatus.schema";
import {AreaSchema} from "./area.schema";
import {MenuSchema} from "./menu.schema";
import {OrderSchema} from "./order.schema";
import {ProfileSchema} from "./profile.schema";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT.toString()),
    dialect: 'mysql',
    logging: false
});

const userAttributes = {
    userId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
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

const customerAttributes = {
    customerId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    surname: {
        type: DataType.STRING,
        allowNull: false
    },
    phone: {
        type: DataType.STRING,
        allowNull: true
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
    status: {
        type: DataType.STRING,
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
}

const orderAttributes = {
    orderId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    customerId: {
        type: DataType.STRING,
        references: {
            model: CustomerSchema,
            key: 'customerId'
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
        type: DataType.STRING,
    },
    quantity: {
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
    number: {
        type: DataType.STRING,
        allowNull: false
    },
    customers: {
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

sequelize.addModels([CustomerSchema, TableSchema, AreaSchema, UserSchema, CategorySchema, MenuSchema, OrderSchema, OrderStatusSchema, RoleSchema, UserTypeSchema, UserStateSchema, ProfileSchema])

UserSchema.init(userAttributes, { sequelize, modelName: 'User' });
AreaSchema.init(areaAttributes, { sequelize, modelName: 'Area' });
TableSchema.init(tableAttributes, { sequelize, modelName: 'Table' });
CustomerSchema.init(customerAttributes, { sequelize, modelName: 'Customer' });
OrderSchema.init(orderAttributes, { sequelize, modelName: 'Order' });
OrderStatusSchema.init(orderStatusAttributes, { sequelize, modelName: 'OrderStatus' });
CategorySchema.init(categoryAttributes, { sequelize, modelName: 'Category' });
MenuSchema.init(menuAttributes, { sequelize, modelName: 'Menu' });

RoleSchema.init(roleAttributes, { sequelize, modelName: 'Role' });
UserTypeSchema.init(userTypeAttributes, { sequelize, modelName: 'UserType' });
UserStateSchema.init(userStateAttributes, { sequelize, modelName: 'UserState' });
ProfileSchema.init(profileAttributes, { sequelize, modelName: 'Profile' });

export default sequelize;
