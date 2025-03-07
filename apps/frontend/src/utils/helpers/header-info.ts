
import { config } from '@config/environment';
import { HOME_PAGE, stripTrailingSlash } from '@utils/helpers/paths';
import { function as func } from 'fp-ts';

export const defaultTitle = config.appName;

export const defaultDescription = 'Sample description..';

const prefixPageTitle = (title: string) => `${defaultTitle} | ${title}`;

export type LandingPageHeadInfo = { description: string; title: string };

export const LANDING_PAGES_HEAD_INFO = {
  home: {
    description: defaultDescription,
    title: prefixPageTitle('AI-powered data notebook for all skill levels'),
  },
} as const satisfies Record<string, LandingPageHeadInfo>;

export type LandingPage = keyof typeof LANDING_PAGES_HEAD_INFO;

export const LANDING_PAGES = Object.keys(LANDING_PAGES_HEAD_INFO) as LandingPage[];

export const isLandingPage = (page: string): page is LandingPage => (LANDING_PAGES as string[]).includes(page);

const stripLeading = (prefix: string) => (path: string) => (path.startsWith(prefix) ? path.slice(prefix.length) : path);

const extractPageFromPath = func.flow(stripLeading(config.urls.frontend), stripLeading('/'), stripTrailingSlash);

export const getPageFromPath = (path: string): LandingPage | null => {
  if (!path.startsWith(config.urls.frontend)) {
    return null;
  }
  const page = extractPageFromPath(path);

  if (page === '') {
    return HOME_PAGE;
  }
  if (isLandingPage(page)) {
    return page;
  }
  return null;
};

const getHeadInfoForPage = (page: LandingPage): LandingPageHeadInfo => LANDING_PAGES_HEAD_INFO[page];

export const getHeadInfoForPath = (path: string) => getHeadInfoForPage(getPageFromPath(path) ?? HOME_PAGE);
