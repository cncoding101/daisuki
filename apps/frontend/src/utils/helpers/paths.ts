export const stripTrailingSlash = (path: string): string => (path.endsWith('/') ? path.slice(0, -1) : path);

export const HOME_PAGE = 'home' as const;
