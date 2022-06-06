import { useEffect, RefObject } from 'react';

const useIntersectionObserver = (
  target: RefObject<HTMLElement>,
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const currentObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);
    const element = target.current;
    if (element) {
      currentObserver.observe(element);
    }

    return () => {
      if (element) {
        currentObserver.unobserve(element);
      }
    };
  }, [callback, options, target]);
};

export default useIntersectionObserver;
