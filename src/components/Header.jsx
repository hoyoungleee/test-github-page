import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { SlArrowDown } from 'react-icons/sl';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import SearchWithCategoryDropdown from './SearchWithCategoryDropdown';
import { IoIosArrowDown } from 'react-icons/io';
import SearchButton from './SearchButton';

import QrCodeModal from './modal/QrCodeModal';

const Header = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showBorder, setShowBorder] = useState(false);
  const [showSearchOnly, setShowSearchOnly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  // 모달 상태 관리
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  // 모달 열기 함수
  const openQrModal = () => {
    setIsQrModalOpen(true);
  };
  // 모달 닫기 함수
  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowSearchOnly(scrollY > 100);

      // 검색창이 열려 있으면 showBorder를 false로 유지
      setShowBorder(searchOpen ? false : scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchOpen]); // searchOpen을 의존성 배열에 추가

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const handleClickOutside = (event) => {
      if (
        searchOpen &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.searchIcon}`)
      ) {
        setSearchOpen(false);
        // 검색창 닫힐 때 스크롤 위치에 따라 showBorder 복원
        setShowBorder(window.scrollY > 0);
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        // ESC 키로 닫힐 때 showBorder 복원
        setShowBorder(window.scrollY > 0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [searchOpen]);

  const menuItems = [
    { title: '중고거래', url: '/used-items' },
    {
      title: '부동산',
      submenu: ['부동산 검색', '중개사 서비스'],
    },
    {
      title: '중고차',
    },
    {
      title: '알바',
      submenu: ['알바 검색', '당근알바 소개', '기업형 서비스', '신뢰와 안전'],
    },
    { title: '동네업체' },
    { title: '동네생활', url: '/community' },
    { title: '모임' },
  ];

  const popularCategories = [
    '인기 검색어',
    '굿즈',
    '플스',
    '닌텐도',
    '다이소',
    '캠핑',
    '포트메리온',
    '에어팟',
    '스타벅스',
    '담력',
    '성숙',
    '다이소',
    '가습기',
    '기프티콘',
    '상품권',
    '기프티카드',
    '노트북',
    '레고',
    '한복',
    '손흥민',
    '의자',
    '아이폰',
    '자전거',
  ];

  return (
    <>
      <header
        className={`${styles.header} ${showBorder ? styles.showBorder : ''} ${
          showSearchOnly ? styles.scrolled : ''
        }`}
      >
        <div className={styles.container}>
          {/* 돋보기 버튼에 클릭 이벤트 추가 */}

          {/* 좌측: 로고 */}
          <div className={styles.left} onClick={() => navigate('/')}>
            <img
              src='/images/logo.png'
              alt='당근 로고'
              className={styles.logo}
            />
          </div>

          {/* 중간: 메뉴 */}
          <div className={styles.center}>
            {!isMainPage && (
              <nav className={styles.menu}>
                {menuItems.map((item, index) => {
                  const isActive = hoveredIndex === index;
                  const menuItemClass = `${styles.menuItem} ${
                    hoveredIndex !== null
                      ? isActive
                        ? styles.active
                        : styles.dimmed
                      : ''
                  }`;

                  const content = (
                    <div
                      className={menuItemClass}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={(e) => {
                        setTimeout(() => {
                          if (
                            !e.relatedTarget ||
                            !e.relatedTarget.closest(`.${styles.dropdown}`)
                          ) {
                            setHoveredIndex(null);
                          }
                        }, 300);
                      }}
                    >
                      <div className={styles.menuText}>
                        {item.title}
                        {item.submenu && (
                          <SlArrowDown className={styles.arrowIcon} />
                        )}
                      </div>

                      {item.submenu && hoveredIndex === index && (
                        <div
                          className={styles.dropdown}
                          onMouseEnter={() => setHoveredIndex(index)}
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <div key={subIndex} className={styles.dropdownItem}>
                              <span>{subItem}</span>
                              {(subItem === '중개사 서비스' ||
                                subItem === '기업형 서비스' ||
                                subItem === '신뢰와 안전') && (
                                <GoArrowUpRight
                                  className={styles.subIcon}
                                  style={{
                                    fontSize: '20px',
                                    color: '#999',
                                    transform: 'translateY(1px)',
                                    display: 'inline-block',
                                    marginLeft: '-2px',
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  return item.url ? (
                    <Link
                      key={index}
                      to={item.url}
                      className={styles.linkWrapper}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </nav>
            )}
          </div>

          {/* 우측: 검색, 앱 다운로드 버튼 */}
          <div className={styles.right}>
            <span
              className={`${styles.searchIcon} ${showSearchOnly ? styles.visible : ''}`}
              onClick={() => {
                setSearchOpen(!searchOpen);
                setShowBorder(searchOpen ? window.scrollY > 0 : false);
              }}
            >
              <BiSearch size={24} />
            </span>
            <button className={styles.downloadBtn} onClick={openQrModal}>
              앱 다운로드
            </button>
            {isQrModalOpen && <QrCodeModal onClose={closeQrModal} />}{' '}
            {/*모달 랜더링링*/}
          </div>
        </div>
      </header>

      {/* 검색 드롭다운 */}
      {searchOpen && (
        <div className={styles.searchDropdown} ref={searchDropdownRef}>
          <div className={styles.searchDropdownContainer}>
            {/* 검색 바 */}
            <div className={styles.searchBar}>
              {/* 위치 선택기 */}
              <div className={styles.locationSelector}>
                <div className={styles.locationButton}>
                  <SearchButton />
                </div>
              </div>
            </div>

            {/* 검색 입력창과 카테고리 선택기 */}
            <SearchWithCategoryDropdown
              searchInputRef={searchInputRef}
              showSearchButton
            />
          </div>

          {/* 인기 검색어 태그 목록 */}
          <div className={styles.categoryList}>
            {popularCategories.map((category, index) => (
              <div key={index} className={styles.categoryItem}>
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
