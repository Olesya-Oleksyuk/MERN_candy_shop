import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, FormGroup, FormLabel, FormCheck, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import { savePaymentMethod } from '../../actions/paymentActions';

const PaymentScreen = () => {
  const history = useHistory();

  // если в local storage есть введеная ранее адресная информация
  const shipping = useSelector((state) => state.shipping);
  const { shippingAddress } = shipping;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('qiwi');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({
      paymentMethod,
    }));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Способ оплаты</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="my-4">
          <FormLabel as="legend">Выберете способ оплаты:</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              label="Оплата с помощью QIWI или дебетовой картой"
              id="qiwi"
              name="paymentMethod"
              value="qiwi"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <FormCheck
              disabled
              type="radio"
              label="Оплата с помощью PayPal"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">Далее</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
