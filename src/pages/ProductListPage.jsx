import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../assets/productData';
import styles from './ProductListPage.module.scss';
import NoSearchResultProduct from './NoSearchResultProduct';
import AuthProvider from '../components/hajoon/context/Location.jsx';
import SearchBar from '../components/hajoon/SearchBar';

const ProductList = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [searchParams] = useSearchParams(); // useSearchParams 훅 사용

  const query = searchParams.get('search') || ''; // 초기값을 빈 문자열로 설정하여 null을 방지
  console.log('현재 검색어:', query);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const toggleShowMoreLocations = () => {
    setShowMoreLocations(!showMoreLocations);
  };

  useEffect(() => {
    let finalFilteredProducts = products;

    // 검색어에 따른 필터링
    if (query) {
      finalFilteredProducts = finalFilteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // 위치 필터링
    if (locationFilter) {
      finalFilteredProducts = finalFilteredProducts.filter(
        (product) => product.sellerData.location === locationFilter,
      );
    }

    // 카테고리 필터링
    if (categoryFilter) {
      finalFilteredProducts = finalFilteredProducts.filter(
        (product) => product.category === categoryFilter,
      );
    }

    // 가격 필터링
    if (priceFilter === 'under5000') {
      finalFilteredProducts = finalFilteredProducts.filter(
        (product) => parseInt(product.price.replace(/[^0-9]/g, '')) <= 5000,
      );
    } else if (priceFilter === 'under10000') {
      finalFilteredProducts = finalFilteredProducts.filter(
        (product) => parseInt(product.price.replace(/[^0-9]/g, '')) <= 10000,
      );
    } else if (priceFilter === 'under20000') {
      finalFilteredProducts = finalFilteredProducts.filter(
        (product) => parseInt(product.price.replace(/[^0-9]/g, '')) <= 20000,
      );
    }

    setFilteredProducts(finalFilteredProducts);
    setVisibleCount(8); // 필터링된 상품이 있을 때 다시 8개로 초기화
  }, [query, locationFilter, categoryFilter, priceFilter]); // query가 변경될 때마다 실행

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const initialLocations = ['잠원동', '서초동'];
  const remainingLocations = [
    ...new Set(products.map((product) => product.sellerData.location)),
  ].filter((location) => !initialLocations.includes(location));
  const visibleLocations = showMoreLocations
    ? [...initialLocations, ...remainingLocations]
    : initialLocations;

  return (
    <>
      <AuthProvider>
        <SearchBar className={styles.searchbar} />
      </AuthProvider>
      <div className={styles.breadcrumb}>
        <span>홈</span>&nbsp;&gt;&nbsp;
        <span>중고거래</span>
        <h1>서울특별시 서초구 서초동 중고거래</h1>
      </div>
      <div className={styles.productListContainer}>
        <aside className={styles.filterSection}>
          <h3>위치</h3>
          <div>
            <label key='all-locations'>
              <input
                type='radio'
                name='location'
                value=''
                checked={locationFilter === ''}
                onChange={handleLocationChange}
              />
              전체
            </label>
            {visibleLocations.map((location) => (
              <label key={location}>
                <input
                  type='radio'
                  name='location'
                  value={location}
                  checked={locationFilter === location}
                  onChange={handleLocationChange}
                />
                {location}
              </label>
            ))}
            {remainingLocations.length > 0 && (
              <button type='button' onClick={toggleShowMoreLocations}>
                {showMoreLocations ? '간략하게' : '더보기'}
              </button>
            )}
          </div>
          <h3>카테고리</h3>
          <div>
            <label key='all-categories'>
              <input
                type='radio'
                name='category'
                value=''
                checked={categoryFilter === ''}
                onChange={handleCategoryChange}
              />
              전체
            </label>
            {uniqueCategories.map((category) => (
              <label key={category}>
                <input
                  type='radio'
                  name='category'
                  value={category}
                  checked={categoryFilter === category}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            ))}
          </div>
          <h3>가격</h3>
          <div>
            <label>
              <input
                type='radio'
                name='price'
                value='free'
                checked={priceFilter === 'free'}
                onChange={handlePriceChange}
              />
              나눔
            </label>
            <label>
              <input
                type='radio'
                name='price'
                value='under5000'
                checked={priceFilter === 'under5000'}
                onChange={handlePriceChange}
              />
              5,000원 이하
            </label>
            <label>
              <input
                type='radio'
                name='price'
                value='under10000'
                checked={priceFilter === 'under10000'}
                onChange={handlePriceChange}
              />
              10,000원 이하
            </label>
            <label>
              <input
                type='radio'
                name='price'
                value='under20000'
                checked={priceFilter === 'under20000'}
                onChange={handlePriceChange}
              />
              20,000원 이하
            </label>
            <label>
              <input
                type='radio'
                name='price'
                value=''
                checked={priceFilter === ''}
                onChange={handlePriceChange}
              />
              전체 가격
            </label>
          </div>
        </aside>
        <div className={styles.productListWrapper}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noResultsProduct}>
              <NoSearchResultProduct />
            </div>
          ) : (
            <div>
              {' '}
              {/* 상품 목록과 더보기 버튼을 감싸는 div 추가 */}
              <div className={styles.productList}>
                {displayedProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className={styles.productItem}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={product.slides?.[0] || '/assets/default-image.jpg'} // ✅ 안정성 개선
                        alt={product.title}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <div className={styles.productPrice}>{product.price}</div>
                      <div className={styles.productLocation}>
                        {product.sellerData.location}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {hasMore && (
                <button
                  className={styles.loadMoreButton}
                  onClick={handleLoadMore}
                >
                  더보기 {/* ✅ UX 개선 */}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
