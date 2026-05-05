import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run immediately and once more on next frame for reliability
    // across browsers/layout timing.
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [pathname, search]);

  return null;
}

export default ScrollToTop;
