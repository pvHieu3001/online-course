import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../../assets/images/base/logo.png';
import logoLightImg from '../../../../assets/images/base/logo-light.png';

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = memo(({
  img = logoImg,
  imgLight = logoLightImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
      aria-label="Đồ Gỗ Hiệp Hồng - Trang chủ"
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-8 sm:max-h-10 ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={img}
          alt="Đồ Gỗ Hiệp Hồng Logo"
          loading="eager"
          width="120"
          height="40"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-8 sm:max-h-10 dark:block"
          src={imgLight}
          alt="Đồ Gỗ Hiệp Hồng Logo - Dark Mode"
          loading="eager"
          width="120"
          height="40"
        />
      )}
    </Link>
  );
});

Logo.displayName = 'Logo';

export default Logo;
