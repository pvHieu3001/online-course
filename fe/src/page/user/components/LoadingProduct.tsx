import { memo, useMemo } from 'react';
import { Skeleton } from 'antd';
import NcImage from '../shared/NcImage/NcImage';

interface LoadingProductProps {
  className?: string;
  size?: 'default' | 'small' | 'large';
}

const LoadingProduct: React.FC<LoadingProductProps> = ({ 
  className = "",
  size = 'default'
}) => {
  // Memoize skeleton props
  const skeletonProps = useMemo(() => ({
    active: true,
    size,
    block: true
  }), [size]);

  return (
    <li>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <div className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              className="object-cover w-full h-full drop-shadow-xl"
              lazy={false}
            />
          </div>
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div className="flex justify-between items-end">
            <Skeleton.Input {...skeletonProps} />
          </div>

          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              <Skeleton.Button {...skeletonProps} />
            </h2>
          </div>
        </div>
      </div>
    </li>
  );
};

export default memo(LoadingProduct);
