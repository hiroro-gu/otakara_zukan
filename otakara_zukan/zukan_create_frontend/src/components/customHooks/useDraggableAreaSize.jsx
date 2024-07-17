import { useEffect } from 'react'

export const useDraggableAreaSize = (templateRef, onAreaSize) => {

  useEffect(() => {
    const updateSize = () => {
      if (templateRef.current) {
        onAreaSize({
          width: templateRef.current.offsetWidth,
          height: templateRef.current.offsetHeight,
        });
      } else {
        setTimeout(updateSize, 10);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize)
    };
  }, []);
}
