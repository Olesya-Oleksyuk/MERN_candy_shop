import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ButtonCandyPrimary from '../buttons/ButtonCandyPrimary';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex my-3 my-sm-3 my-lg-0">
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Введите название..."
        className="navbar__input me-lg-2 ms-lg-3 me-3"
      />
      <ButtonCandyPrimary type="submit" variant="dark">Поиск</ButtonCandyPrimary>
    </Form>
  );
};

export default SearchBox;
