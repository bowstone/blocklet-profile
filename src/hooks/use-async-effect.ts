import { DependencyList, useEffect } from 'react';

export const useAsyncEffect = (callback: () => Promise<any>, deps: DependencyList = []) => {
  useEffect(() => {
    (async () => {
      await callback();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
