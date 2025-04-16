import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.scss';
import FooterColumn from './FooterColumn';
import SocialIcon from './SocialIcon';

const Footer = () => {
  const footerData = {
    company: {
      title: '회사',
      links: [
        { name: '회사 소개', url: '/about' },
        { name: '당근페이', url: '/payment' },
        { name: '팀문화', url: '/culture' },
        { name: '서비스 소개', url: '/services' },
        { name: '블로그', url: '/blog' },
        { name: '채용', url: '/careers' },
      ],
    },
    explore: {
      title: '탐색',
      links: [
        { name: '중고거래', url: '/market' },
        { name: '부동산', url: '/realestate' },
        { name: '중고차', url: '/cars' },
        { name: '알바', url: '/jobs' },
        { name: '동네업체', url: '/local-business' },
        { name: '동네생활', url: '/community' },
        { name: '모임', url: '/meetings' },
        { name: '채팅하기', url: '/chat' },
      ],
    },
    business: {
      title: '비즈니스',
      links: [
        { name: '당근 비즈니스', url: '/business' },
        { name: '제휴 문의', url: '/partnership' },
        { name: '광고 문의', url: '/advertising' },
      ],
    },
    karrot: {
      title: 'Karrot',
      links: [
        { name: 'Canada', url: '/ca', hasArrow: true },
        { name: 'United States', url: '/us', hasArrow: true },
        { name: 'United Kingdom', url: '/uk', hasArrow: true },
        { name: '日本', url: '/jp', hasArrow: true },
      ],
    },
    inquiry: {
      title: '문의',
      links: [
        { name: 'IR', url: '/ir' },
        { name: 'PR', url: '/pr' },
        { name: '고객센터', url: '/support' },
      ],
    },
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <img
              src='/images/logo.png'
              alt='당근마켓 로고'
              className={styles.logo}
            />
            <div className={styles.socialIcons}>
              <SocialIcon href='https://www.facebook.com/daangn/'>
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href='https://www.instagram.com/daangnmarket/'>
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href='https://www.youtube.com/channel/UC8tsBsQBuF7QybxgLmStihA'>
                <FaYoutube />
              </SocialIcon>
            </div>
          </div>

          <div className={styles.linksSection}>
            <FooterColumn
              title={footerData.company.title}
              links={footerData.company.links}
            />
            <FooterColumn
              title={footerData.explore.title}
              links={footerData.explore.links}
            />
            <FooterColumn
              title={footerData.business.title}
              links={footerData.business.links}
            />
            <FooterColumn
              title={footerData.karrot.title}
              links={footerData.karrot.links}
            />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <FooterColumn
            title={footerData.inquiry.title}
            links={footerData.inquiry.links}
          />
        </div>

        <div className={styles.divider}></div>

        <div className={styles.additionalInfo}>
          <p>(주) 당근마켓</p>
          <p>대표: 김용현, 황도연 | 사업자번호: 375-87-00088</p>
          <p>직업정보제공사업 신고번호: J1200020200016</p>
          <p>통신판매업 신고번호: 2021-서울서초-2875</p>
          <p>호스팅 사업자: Amazon Web Service(AWS)</p>
          <p>주소: 서울특별시 구로구 디지털로 300, 10층 (당근서비스)</p>
          <p>전화: 1544-9796 | 고객문의cs@daangnservice.com</p>

          <ul className={styles.footerContent}>
            <li>
              <p>이용약관</p>
            </li>
            <li>
              <p>개인정보처리방침</p>
            </li>
            <li>
              <p>운영정책</p>
            </li>
            <li>
              <p>위치기반서비스 이용약관</p>
            </li>
            <li>
              <p>이용자보호 비전과 계획</p>
            </li>
            <li>
              <p>청소년보호정책</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
