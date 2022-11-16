import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormControl, FormGroup, FormLabel,
} from 'react-bootstrap';
import { post } from 'axios';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { listProductDetails, updateProduct } from '../../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState({
    inProgress: false,
    uploadingError: '',
  });

  const dispatch = useDispatch();
  const imgInputRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: loggedInUser } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: loadingProduct, error: errorProductDetails, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const limitImageTypesToAccept = (inputFileRef) => inputFileRef.current?.setAttribute('accept', 'image/*');

  useEffect(() => {
    if (loggedInUser && loggedInUser.isAdmin) {
      imgInputRef.current && limitImageTypesToAccept(imgInputRef);
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        history.push('/admin/productlist');
      } else if (!product?.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    // добавляем к объекту поле с именем image и значением загруженного изображения
    formData.append('image', file);
    setUploading({ ...uploading, inProgress: true });

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await post('/api/upload', formData, config);
      setImage(data);
      setUploading({ inProgress: false, uploadingError: '' });
    } catch {
      setUploading({
        inProgress: false,
        uploadingError: 'Ошибка загрузки изображения! Доступные расширения: jpg, jpeg, png.',
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }));
  };

  const loginFormContent = () => {
    if (loadingProduct) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (errorProductDetails) {
      return <Message variant="danger">{errorProductDetails}</Message>;
    }

    if (product?.name) {
      return (
        <>
          <h1>Редактирование</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-3">
              <FormLabel>Название</FormLabel>
              <FormControl type="text" placeholder="Введите название" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="price" className="my-3">
              <FormLabel>Цена</FormLabel>
              <FormControl type="number" placeholder="Введите цену" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="image" className="my-3">
              <FormLabel>Фото</FormLabel>
              <FormControl type="text" placeholder="Введите URL-фото" value={image} onChange={(e) => setImage(e.target.value)} />
            </FormGroup>
            <Form.Group controlId="image-file" className="mb-3">
              <Form.Control type="file" size="sm" aria-label="Выберете файл" onChange={uploadFileHandler} ref={imgInputRef} />
              {uploading.inProgress && <Loader />}
              {uploading.uploadingError && <Message variant="danger">{uploading.uploadingError}</Message>}
            </Form.Group>
            <FormGroup controlId="brand" className="my-3">
              <FormLabel>Бренд</FormLabel>
              <FormControl type="text" placeholder="Введите бренд" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="countInStock" className="my-3">
              <FormLabel>Количество</FormLabel>
              <FormControl type="number" placeholder="Введите количество на складе" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="category" className="my-3">
              <FormLabel>Категория</FormLabel>
              <FormControl type="text" placeholder="Введите категорию" value={category} onChange={(e) => setCategory(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="description" className="my-3">
              <FormLabel>Описание</FormLabel>
              <FormControl type="text" placeholder="Введите описание" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Обновить
            </Button>
          </Form>
        </>
      );
    }

    return <></>;
  };

  const updateProductProgress = () => {
    if (loadingUpdate) {
      return <Loader />;
    }
    if (errorUpdate) {
      return <Message variant="danger">{errorUpdate}</Message>;
    }
    return <></>;
  };

  return (
    <>
      { product?.name || errorProductDetails
        ? (
          <Link to="/admin/productlist" className="btn btn-light my-3">
            Вернуться
          </Link>
        )
        : <></>}
      <FormContainer>
        {updateProductProgress()}
        {loginFormContent()}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
