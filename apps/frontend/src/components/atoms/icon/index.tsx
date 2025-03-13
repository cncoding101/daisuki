import { unreachableWithReturn } from '@utils/types/unreachable';
import React, { lazy, Suspense, useMemo } from 'react';

type Type = keyof typeof REACT_ICONS;
type Variant =
  | {
      type: 'md';
      icon: MdVariant;
    }
  | {
      type: 'fa';
      icon: FaVariant;
    }
  | {
      type: 'fi';
      icon: FiVariant;
    }
  | {
      type: 'io';
      icon: IoVariant;
    }
  | {
      type: 'gi';
      icon: GiVariant;
    };
type MdVariant = keyof typeof REACT_ICONS.md;
type FaVariant = keyof typeof REACT_ICONS.fa;
type FiVariant = keyof typeof REACT_ICONS.fi;
type IoVariant = keyof typeof REACT_ICONS.io;
type GiVariant = keyof typeof REACT_ICONS.gi;

interface IProps {
  variant: Variant;
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
  gi: {
    spacesuit: 'GiSpaceSuit',
  },
} as const;

const ICON_TYPES = Object.keys(REACT_ICONS) as Type[];

const Icon: React.FC<IProps> = ({ variant, color, size, className }) => {
  // Memoize the dynamic import to prevent re-imports on every render
  const IconComponent = useMemo(() => {
    const { icon, type } = variant;
    if (!ICON_TYPES.includes(type)) return null;

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

      case 'gi':
        return lazy(() =>
          import('react-icons/gi').then((icons) => ({
            default: icons[REACT_ICONS.gi[icon as GiVariant]],
          })),
        );

      default:
        return unreachableWithReturn(type, null);
    }
  }, [variant]);

  if (IconComponent == null) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IconComponent color={color} size={size} className={className} />
    </Suspense>
  );
};

export default Icon;
