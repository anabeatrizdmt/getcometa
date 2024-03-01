import React, { useState } from 'react';

interface PaymentInterfaceProps {
    customers: string[];
    onPay: (scenario: string, customerName: string, amount: number) => void;
}

const PaymentInterface: React.FC<PaymentInterfaceProps> = ({ customers, onPay }) => {
    const [scenario, setScenario] = useState('equally');
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState(0);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const handlePay = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    scenario,
                    customerName,
                    amount
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(data.message);
            } else {
                setResponseMessage('Un error ocurrió mientras se procesaba el pago.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Un error ocurrió mientras se procesaba el pago.');
        }
    };

    return (
        <div>
            <label htmlFor="scenario">División de cuenta: </label>
            <select id="scenario" value={scenario} onChange={(e) => setScenario(e.target.value)}>
                <option value="equally">Igualmente</option>
                <option value="by-customer">Por cliente</option>
            </select>
            <br />
            <label htmlFor="customer">Cliente: </label>
            <select id="customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
                <option value="">Selecione el cliente</option>
                {customers.map((customer, index) => (
                    <option key={index} value={customer}>{customer}</option>
                ))}
            </select>
            <br />
            <label htmlFor="amount">Valor: </label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            <br />
            <button onClick={handlePay}>Pagar</button>
            {responseMessage && (
                <div className="response-box">{responseMessage}</div>
            )}
        </div>
    );
};

export default PaymentInterface;