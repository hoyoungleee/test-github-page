import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import style from './ImageCarousel.module.scss';

const ImageCarousel = ({ slides, currentIndex, setCurrentIndex }) => {
  const images = slides;
  const imageCount = images ? images.length : 0;

  if (!images || imageCount === 0) {
    return <div className={style.carouselPlaceholder}>이미지가 없습니다.</div>;
  }

  if (imageCount === 1) {
    return (
      <div className={`${style.imageCarouselManual} ${style.singleImage}`}>
        <img src={images[0]} alt="상품 이미지 1" className={style.carouselSlideImage} />
      </div>
    );
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === imageCount - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={style.imageCarouselManual}> {/* Main container */}
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className={`${style.carouselArrow} ${style.leftArrow}`}
        aria-label="이전 슬라이드"
      >
        <IoIosArrowBack />
      </button>

      {/* Image viewport */}
      <div className={style.carouselImageContainer}>
        {/* Sliding div holding all images */}
        <div
          className={style.carouselImageSlider}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Sliding logic
        >
          {images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`상품 이미지 ${index + 1}`}
              className={style.carouselSlideImage} // Individual image style
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className={`${style.carouselArrow} ${style.rightArrow}`}
        aria-label="다음 슬라이드"
      >
        <IoIosArrowForward />
      </button>

      {/* Dots Indicator */}
      <div className={style.carouselDots}>
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`${style.carouselDot} ${currentIndex === slideIndex ? style.active : ''}`}
            aria-label={`상품 이미지 ${slideIndex + 1}로 이동`}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;