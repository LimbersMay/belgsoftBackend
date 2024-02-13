import {v4 as uuidv4} from 'uuid';
import {
    AreaSchema,
    CategorySchema,
    MenuSchema,
    OrderMenuSchema,
    OrderSchema,
    OrderStatusSchema,
    TableSchema,
    UserSchema
} from "../models";
import {OrderResponse} from "../mappers";
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";
import {CreateOrderDTO} from "../controllers/order/validators/order.create";
import {UpdateOrderDTO} from "../controllers/order/validators/order.update";
import sequelize from "../models/init";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllOrders = async (specifications: Criteria) => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const orders = await OrderSchema.findAll({
        where: whereQuery,
        include: [
            {model: AreaSchema, as: 'area'},
            {model: TableSchema, as: 'table'},
            {model: UserSchema, as: 'user'},
            {model: OrderStatusSchema, as: 'orderStatus'},
            {
                model: MenuSchema, as: 'menuItems', include: [{
                    model: CategorySchema, as: 'category'
                }
                ]
            }
        ],
        order: [
            ['updatedAt', 'ASC']
        ],
    });

    return orders.map(order => OrderResponse.fromOrder(order));
}

export const createOrder = async (order: CreateOrderDTO, branchId: string, userId: string) => {

    /*
        {
            "menuId": "5aced550-a1e8-4643-a7c6-ab98954db2d2",
            "quantity": 4,
            "price": 55
        },
        {
            "menuId": "5aced550-a1e8-4643-a7c6-ab98954db2d2",
            "quantity": 4,
            "price": 55
        }
     */
    const t = await sequelize.transaction();

    try {
        const orderId = uuidv4();

        const orderInstance = await OrderSchema.create({
            ...order,
            orderId,
            price: 0,
            quantity: 0,
            branchId,
            orderStatusId: '8c65c0c9-0244-4ba6-8e6b-498c089e0a49',
            userId
        }, {
            transaction: t
        });

        order.menuItems.forEach(async (menuItem) => {
            await OrderMenuSchema.create({
                orderMenuId: uuidv4(),
                orderId,
                menuId: menuItem.menuId,
                quantity: menuItem.quantity,
                price: menuItem.price
            });

        }, {
            transaction: t
        });

        await t.commit();

        // Call the store procedure to calculate the total price of the order
        await sequelize.query("CALL spCalculateOrderTotals(:orderIdParam)", {
            replacements: {
                orderIdParam: orderInstance.orderId
            }
        });

        await orderInstance.reload({
            include: [
                {model: AreaSchema, as: 'area'},
                {model: TableSchema, as: 'table'},
                {model: UserSchema, as: 'user'},
                {model: OrderStatusSchema, as: 'orderStatus'},
                {model: MenuSchema, as: 'menuItems', include: [{model: CategorySchema, as: 'category'}]}
            ]
        });

        return OrderResponse.fromOrder(orderInstance);
    } catch (e) {
        console.log(e)
        await t.rollback();
        throw e;
    }
}

export const updateOrder = async (orderDTO: UpdateOrderDTO, specifications: Criteria) => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const [affectedCount] = await OrderSchema.update(orderDTO, {
        where: whereQuery
    });

    return affectedCount;
}

export const checkoutOrder = async (specifications: Criteria) => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    await OrderSchema.update({
        orderStatusId: 'd7de7cac-fb2a-468b-a760-c6089f35c453'
    }, {
        where: whereQuery
    });

    const updatedOrder = await OrderSchema.findOne({
        where: whereQuery,
        include: [
            {model: AreaSchema, as: 'area'},
            {model: TableSchema, as: 'table'},
            {model: UserSchema, as: 'user'},
            {model: OrderStatusSchema, as: 'orderStatus'},
            {model: MenuSchema, as: 'menuItems', include: [{model: CategorySchema, as: 'category'}]}
        ]
    });

    if (!updatedOrder) {
        throw new Error('Order not found');
    }

    return OrderResponse.fromOrder(updatedOrder);
}

export const deleteOrder = async (specifications: Criteria) => {

        const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const deletedOrder = await OrderSchema.findOne({
            where: whereQuery
        });

        if (!deletedOrder) {
            throw new Error('Order not found');
        }

        // First delete the order from the intermediate table
        await OrderMenuSchema.destroy({
            where: {
                orderId: deletedOrder.orderId
            }
        });

        // Then delete the order
    return await OrderSchema.destroy({
            where: whereQuery
    });
}
