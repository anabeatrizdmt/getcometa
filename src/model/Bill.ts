export interface Bill {
    totalAmount: number;
    billByCustomer: Record<string, number>;
}