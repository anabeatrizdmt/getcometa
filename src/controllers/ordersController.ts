import { Order } from "../model/Order";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Bill } from "../model/Bill";

let orders: Order[] = [];
let customers: Set<string> = new Set();
let pendingPaymentAmount = 0;

const calculateBillByCustomer = (): Bill => {
    const billByCustomer: Record<string, number> = {};
    let totalAmount = 0;
    orders.forEach(order => {
        billByCustomer[order.customerName] = (billByCustomer[order.customerName] || 0) + Number(order.amount);
        totalAmount += Number(order.amount);
    });
    return { totalAmount, billByCustomer };
};

export const ordersController = {
    receiveOrder: (request: Request, ressponse: Response) => {
        try {
            const order = request.body;
            const orderId = uuidv4();
            order.id = orderId;
            orders.push(order);
            customers.add(order.customerName);
            pendingPaymentAmount += Number(order.amount);
            ressponse.json({ message: 'Orden recibida exitosamente.' });
        } catch (error) {
            ressponse.status(500).json({ message: 'Error al recibir la orden.' });
        }
    },

    getOrders: (_request: Request, ressponse: Response) => {
        ressponse.json({ orders });
    },

    getCustomers: (_request: Request, response: Response) => {
        response.json({ customers: Array.from(customers) });
    },

    getBill: (_request: Request, response: Response) => {
        const bill = calculateBillByCustomer();
        response.json(bill);
    },

    payBill: (request: Request, response: Response) => {
        const { scenario, customerName, amount } = request.body;

        if (orders.length === 0 || pendingPaymentAmount === 0) {
            response.json({ message: 'No hay cuentas por pagar.' });
            return;
        }

        if (!customers.has(customerName)) {
            return response.json({ message: `El cliente ${customerName} no tiene cuenta pendiente.` });
        }

        switch (scenario) {
            case 'equally':
                const amountPerCustomer = pendingPaymentAmount / customers.size;
                if (amount < amountPerCustomer) {
                    return response.json({ message: `El valor pago por ${customerName} no es suficiente. Por favor repita la operación con el valor mínimo necessário: ${amountPerCustomer}` });
                }
                return response.json({ message: `El cliente ${customerName} há pagado con exito el valor necessário: ${amountPerCustomer}` });
                break;
            case 'by-customer':
                const { billByCustomer } = calculateBillByCustomer();
                const customerAmountDue = billByCustomer[customerName] || 0;
                if (amount < customerAmountDue) {
                    return response.json({ message: `El valor pago por ${customerName} no es suficiente para su cuenta individual. Por favor repita la operación con el valor mínimo necessário: ${customerAmountDue}` });
                }
                return response.json({ message: `El cliente ${customerName} há pagado con exito el valor necessário de su cuenta individual: ${customerAmountDue}` });
                break;
            default:
                return response.json({ message: 'No se puede dividir la cuenta de esta manera.' });
        }
    }
};
