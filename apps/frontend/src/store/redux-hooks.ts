import {
  /* eslint-disable no-restricted-imports */
  useDispatch as originalUseDispatch,
  useSelector as originalUseSelector,
  useStore as originalUseStore,
  /* eslint-enable no-restricted-imports */
} from 'react-redux';

import type { DispatchType, Selector, Store } from '.';

export const useStore: () => Store = originalUseStore;
export const useDispatch: () => DispatchType = originalUseDispatch;
export const useSelector: <TSelected = unknown>(
  selector: Selector<TSelected>,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => TSelected = originalUseSelector;
