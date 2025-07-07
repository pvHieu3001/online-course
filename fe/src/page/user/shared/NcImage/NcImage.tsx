import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import checkInViewIntersectionObserver from "../../../../utils/isInViewPortIntersectionObserver";
import PlaceIcon from "./PlaceIcon";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  lazy?: boolean;
  placeholder?: string;
  sizes?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  lazy = true,
  placeholder,
  sizes = "100vw",
  ...args
}) => {
  const _containerRef = useRef<HTMLDivElement>(null);
  const _imageRef = useRef<HTMLImageElement>(null);

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoize image loading logic
  const _imageOnViewPort = useCallback(() => {
    if (!src) {
      _handleImageLoaded();
      return true;
    }

    const img = new Image();
    img.src = src;
    img.addEventListener("load", _handleImageLoaded);
    img.addEventListener("error", _handleImageError);
    
    return true;
  }, [src]);

  const _handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
    set__src(src);
    setImageError(false);
  }, [src]);

  const _handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  const _checkInViewPort = useCallback(() => {
    if (!_containerRef.current || !lazy) {
      _imageOnViewPort();
      return;
    }

    checkInViewIntersectionObserver({
      target: _containerRef.current,
      options: {
        root: null,
        rootMargin: "50px", // Load images 50px before they come into view
        threshold: 0.1,
      },
      freezeOnceVisible: true,
      callback: _imageOnViewPort,
    });
  }, [lazy, _imageOnViewPort]);

  useEffect(() => {
    _checkInViewPort();
  }, [_checkInViewPort]);

  // Memoize loading placeholder
  const renderLoadingPlaceholder = useMemo(() => {
    if (imageError) {
      return (
        <div
          className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
        >
          <div className="h-2/4 max-w-[50%] text-center">
            <PlaceIcon />
            <p className="text-xs mt-2">Lỗi tải hình ảnh</p>
          </div>
        </div>
      );
    }

    if (placeholder) {
      return (
        <img 
          src={placeholder} 
          className={className} 
          alt={`${alt} placeholder`}
          loading="lazy"
        />
      );
    }

    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  }, [className, imageError, placeholder, alt]);

  // Memoize the final image element
  const imageElement = useMemo(() => {
    if (!__src || !imageLoaded) return null;

    return (
      <img 
        ref={_imageRef}
        src={__src} 
        className={className} 
        alt={alt} 
        loading={lazy ? "lazy" : "eager"}
        sizes={sizes}
        {...args} 
      />
    );
  }, [__src, imageLoaded, className, alt, lazy, sizes, args]);

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {imageElement || renderLoadingPlaceholder}
    </div>
  );
};

export default React.memo(NcImage);
