import { useCallback, useEffect, useRef } from 'react';

type CancellablePromise<T> = {
  promise: Promise<T>;
  cancel: () => void;
};

/**
 * This hook is used to cancel pending promises (often from api calls) if a component is unmounted while the api call is loading
 * @returns the use hook that creates a cancellable promise
 */
export function useCancellablePromise() {
  const promises = useRef<CancellablePromise<unknown>[]>([]);

  useEffect(() => {
    return function cancel() {
      promises.current.forEach((p) => p.cancel());
      promises.current = [];
    };
  }, []);

  const cancellablePromise = useCallback(<T,>(p: Promise<T>) => {
    const cPromise = makeCancelable<T>(p);
    promises.current.push(cPromise);
    return cPromise.promise;
  }, []);
  return { cancellablePromise };
}

export function makeCancelable<T>(promise: Promise<T>) {
  let isCanceled = false;
  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((val) => !isCanceled && resolve(val))
      .catch((error) => !isCanceled && reject(error));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}
