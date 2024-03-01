import React, { useEffect, useState } from 'react';
import PaymentInterface from './components/PaymentsInterface';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<string[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
      const response = await fetch('http://localhost:3001/orders/customers');
      const data = await response.json();
      setCustomers(data.customers);
      } catch (error) {
        console.error('Error recuperando la lista de clientes:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handlePayment = (scenario: string, customerName: string, amount: number) => {
    console.log("Payment scenario:", scenario);
    console.log("Customer name:", customerName);
    console.log("Amount:", amount);
  };

  return (
    <div className="App">
      <h1>Payment Interface</h1>
      <PaymentInterface customers={customers} onPay={handlePayment} />
    </div>
  );
};

export default App;
