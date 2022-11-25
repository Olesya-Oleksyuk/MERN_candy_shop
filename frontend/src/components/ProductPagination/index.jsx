import React, { useEffect, useState } from 'react';
import Pagination from '@vlsergey/react-bootstrap-pagination';
import { useHistory } from 'react-router-dom';

const ProductPagination = ({
  pages, page, isAdmin = false, keyword = '',
}) => {
  const history = useHistory();

  const getCurrentBreakpoint = (width) => {
    if (width >= 1200) return 'xl';
    if (width >= 768) return 'md';
    if (width >= 576) return 'sm';
    return 'xs';
  };

  const [viewport, setViewport] = useState(getCurrentBreakpoint(window.innerWidth));

  const updateMedia = () => {
    setViewport(getCurrentBreakpoint(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const getLink = (pageNumber) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNumber}`;
    }
    if (keyword) {
      return `/search/${keyword}/page/${pageNumber}`;
    }
    return `/page/${pageNumber}`;
  };

  const handleChange = ({ target: { value } }) => {
    history.push(getLink(value, keyword, isAdmin));
  };

  return pages > 1 && (
    <div className={`product-pagination-${viewport}`}>
      <Pagination
        value={page}
        totalPages={pages}
        firstPageValue={1}
        onChange={handleChange}
        showFirstLast={viewport === 'xl'}
        showPrevNext={false}
        atBeginEnd={1}
      />
    </div>
  );
};

export default ProductPagination;
