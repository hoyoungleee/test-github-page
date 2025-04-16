import React, { useEffect, useState } from 'react';
import style from './ProductDetailsPage.module.scss';
import ImageCarousel from '../components/ImageCarousel';
import SellerInfo from '../components/SellerInfo';
import zoomStyle from './ImageZoom.module.scss';
import products from '../assets/productData.js';
import QrCodeModal from '../components/modal/QrCodeModal.jsx';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import 추가
import DownloadBanner from '../components/hoyoung/DownloadBanner.jsx';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ProductDetailsPage = () => {
  const { id: currentProductId } = useParams(); // URL에서 상품 ID를 가져옵니다.
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 불러오기
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 현재 슬라이드 인덱스 상태 추가

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const openQrModal = () => {
    setIsQrModalOpen(true);
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  useEffect(() => {
    // URL의 id와 일치하는 상품 데이터를 찾습니다.
    const foundProduct = products.find((p) => p.id === currentProductId);
    if (foundProduct) {
      const deepCopiedProduct = {
        ...foundProduct,
        popularListings: foundProduct.popularListings.map(item => ({ ...item })),
      };
      const shuffledPopularListings = shuffleArray(deepCopiedProduct.popularListings);
      setProduct({ ...deepCopiedProduct, popularListings: shuffledPopularListings });
    }
    setCurrentSlideIndex(0); // 상품이 변경될 때 슬라이드 인덱스 초기화
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤 맨 위로 (선택 사항)
  }, [currentProductId]);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>; // 상품 ID에 해당하는 데이터가 없을 경우
  }

  const {
    title,
    slides,
    sellerData,
    sellerOtherProducts,
    category,
    timeAgo,
    price,
    description,
    stats,
    popularListings,
  } = product;

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // 클릭 시 해당 상품 ID로 이동
    setCurrentSlideIndex(0); // 다른 상품 클릭 시 슬라이드 인덱스 초기화
    window.scrollTo(0, 0); // 페이지 이동 후 스크롤 맨 위로
  };

  return (
    <>
      <div className={style.productDetailsPage}>
        <div className={style.breadcrumb}>
          <span>홈</span>&nbsp;&gt;&nbsp;
          <span>중고거래</span>&nbsp;&gt;&nbsp;
          <span>{title}</span>
        </div>
        <div className={style.mainContent}>
          <div className={style.carouselSection}>
            <ImageCarousel
              slides={slides}
              currentIndex={currentSlideIndex}
              setCurrentIndex={setCurrentSlideIndex}
            />{' '}
            {/* props로 전달 */}
            <SellerInfo {...sellerData} />
          </div>

          <div className={style.infoSection}>
            <h1 className={style.productTitle}>{title}</h1>

            <div className={style.metaInfo}>
              <span>{category}</span>
              <span>·</span>
              <span>{timeAgo}</span>
            </div>

            <div className={style.price}>{price}</div>

            <div className={style.sellerInfo}>
              <h2>판매자 정보</h2>
              <p>[판매자 정보 영역]</p>
            </div>

            <div className={style.description}>
              {description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className={style.stats}>
              <span>채팅 {stats.chats}</span>
              <span>·</span>
              <span>관심 {stats.likes}</span>
              <span>·</span>
              <span>조회 {stats.views}</span>
            </div>

            <button
              type='button'
              className={style.actionButton}
              onClick={openQrModal}
            >
              당근 앱에서 보기
            </button>
          </div>
        </div>

        <div className={style.sellerProductsSection}>
          <div className={style.sectionTitleContainer}>
            <h2 className={style.sectionTitle}>
              {sellerData.nickname} 님의 판매물품
            </h2>
            <button className={style.viewMoreLink} onClick={openQrModal}>
              더 구경하기 &gt;
            </button>
          </div>

          <div className={style.sellerProductsList}>
            {sellerOtherProducts.map((item, index) => (
              <div
                key={index}
                className={style.productCard}
                onClick={() => handleProductClick(item.id)} // 클릭 시 슬라이드 인덱스 초기화
                style={{ cursor: 'pointer' }}
              >
                <div className={zoomStyle.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`${style.productImage} ${zoomStyle.image}`}
                  />
                </div>

                <div className={style.productDetails}>
                  <div className={style.productTitle}>{item.title}</div>
                  <div className={style.productPrice}>{item.price}</div>
                  <div className={style.productLocation}>{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={style.popularListingsSection}>
          <div className={style.sectionTitleContainer}>
            <h2 className={style.sectionTitle}>인기 매물</h2>
            <button className={style.viewMoreLink} onClick={openQrModal}>
              더 구경하기 &gt;
            </button>
          </div>
          <div className={style.popularListingsList}>
            {popularListings.map((item, index) => (
              <div
                key={index}
                className={style.productCard}
                onClick={() => handleProductClick(item.id)} // 클릭 시 슬라이드 인덱스 초기화
                style={{ cursor: 'pointer' }}
              >
                <div className={zoomStyle.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`${style.productImage} ${zoomStyle.image}`}
                  />
                </div>
                <div className={style.productDetails}>
                  <div className={style.productTitle}>{item.title}</div>
                  <div className={style.productPrice}>{item.price}</div>
                  <div className={style.productLocation}>{item.location}</div>
                </div>
              </div>
            ))}
          </div>
          <button className={style.viewMoreButton} onClick={openQrModal}>
            더 구경하기
          </button>
          {isQrModalOpen && <QrCodeModal onClose={closeQrModal} />}
        </div>
      </div>
      <DownloadBanner />
    </>
  );
};

export default ProductDetailsPage;
