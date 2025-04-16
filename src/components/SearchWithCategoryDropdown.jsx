import React, { useState } from 'react';
import { FaCaretDown, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchWithCategoryDropdown.module.scss';

const SearchWithCategoryDropdown = ({ searchInputRef, showSearchButton }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('중고거래');
  const [searchParams, setSearchParams] = useSearchParams(); // searchParams를 사용
  const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

  const categories = [
    '중고거래',
    '부동산',
    '중고차',
    '알바',
    '동네업체',
    '동네생활',
    '모임',
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    const inputValue = searchInputRef.current.value.trim(); // input 값 가져오기
    if (inputValue.trim()) {
      let path = '';

      switch (selectedCategory) {
        case '중고거래':
          path = 'used-items';
          break;
        case '동네업체':
          path = 'hometown';
          break;
        case '알바':
          path = 'work';
          break;
        case '부동산':
          path = 'house';
          break;
        case '중고차차':
          path = 'car';
          break;
        case '동네생활':
          path = 'community';
          break;
        case '모임':
          path = 'crew';
          break;
        default:
          path = 'search';
      }
      // 쿼리 파라미터로 검색어와 카테고리 추가
      setSearchParams({ search: inputValue, category: selectedCategory }); // 쿼리 파라미터 업데이트

      navigate(`/${path}?search=${encodeURIComponent(inputValue.trim())}`);
      // 검색 후 페이지 상단으로 스크롤
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.categorySelector} onClick={toggleDropdown}>
        <div className={styles.categoryButton}>
          <span className={styles.categorys}>{selectedCategory}</span>
          <FaCaretDown className={styles.facaret} />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            {categories.map((category) => (
              <li
                key={category}
                className={styles.dropdownItem}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        ref={searchInputRef}
        type='text'
        placeholder='검색어를 입력해주세요'
        className={styles.searchInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />

      {showSearchButton && (
        <button className={styles.showSearchButton} onClick={handleSearch}>
          <FaArrowRight className={styles.showSearchButtonIcon} />
        </button>
      )}
    </div>
  );
};

export default SearchWithCategoryDropdown;
