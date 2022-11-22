import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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
        className="me-lg-2 ms-lg-3 me-3"
      />
      <Button type="submit" variant="outline-light" className="p-2">Поиск</Button>
    </Form>
  );
};

export default SearchBox;
