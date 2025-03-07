import React, { useMemo, lazy, Suspense } from 'react';

type Type = keyof typeof REACT_ICONS;
type Variant = MdVariant | FaVariant | FiVariant | IoVariant;
type MdVariant = keyof typeof REACT_ICONS.md;
type FaVariant = keyof typeof REACT_ICONS.fa;
type FiVariant = keyof typeof REACT_ICONS.fi;
type IoVariant = keyof typeof REACT_ICONS.io;

interface IProps {
  type: Type;
  icon: Variant;
  size?: number;
  color?: string;
  className?: string;
}

const REACT_ICONS = {
  md: {
    download: 'MdOutlineFileDownload',
  },
  fa: {
    preview: 'FaRegEye',
    user: 'FaUserAstronaut',
  },
  fi: {
    cart: 'FiShoppingBag',
  },
  io: {
    close: 'IoMdClose',
  },
} as const;

const ICON_TYPES = Object.keys(REACT_ICONS) as Type[];

const Icon: React.FC<IProps> = ({ icon, type, color, size, className }) => {
  // Memoize the dynamic import to prevent re-imports on every render
  const IconComponent = useMemo(() => {
    if (!ICON_TYPES.includes(type)) return null;

    console.log(ICON_TYPES.includes(type), type);
    switch (type) {
      case 'md':
        return lazy(() =>
          import('react-icons/md').then((icons) => ({
            default: icons[REACT_ICONS.md[icon as MdVariant]],
          })),
        );

      case 'fa':
        return lazy(() =>
          import('react-icons/fa').then((icons) => ({
            default: icons[REACT_ICONS.fa[icon as FaVariant]],
          })),
        );

      case 'fi':
        return lazy(() =>
          import('react-icons/fi').then((icons) => ({
            default: icons[REACT_ICONS.fi[icon as FiVariant]],
          })),
        );

      case 'io':
        return lazy(() =>
          import('react-icons/io').then((icons) => ({
            default: icons[REACT_ICONS.io[icon as IoVariant]],
          })),
        );

      default:
        return null;
    }
  }, [icon, type]);

  if (IconComponent == null) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IconComponent color={color} size={size} className={className} />
    </Suspense>
  );
};

export default Icon;
