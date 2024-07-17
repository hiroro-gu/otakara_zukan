import { useEffect } from 'react'
import interact from 'interactjs';

const useDraggable = (selector, onUpdatePosition) => {
  useEffect(() => {
    const draggableInstance = interact(selector)
      .draggable({
        onstart: (event) => {
          event.target.style.willChange = 'transform';
        },
        onmove: event => {
          requestAnimationFrame(() => {
            const target = event.target;
            const x = (parseFloat(target.style.left) || 0) + event.dx;
            const y = (parseFloat(target.style.top) || 0) + event.dy;
            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
          });
        },
        onend: (event) => {
          event.target.style.willChange = 'auto';
          handleUpdatePosition(event);
        },
      })

    const handleUpdatePosition = (event) => {
      const target = event.target;
      const uuid = target.getAttribute('data-id');
      const x = parseFloat(target.style.left) || 0;
      const y = parseFloat(target.style.top) || 0;

      const draggableArea = document.querySelector('.draggable-area');

      if (x < 0 || y < 0 || x > draggableArea.offsetWidth || y > draggableArea.offsetHeight) {
        target.style.left = '0px';
        target.style.top = '0px';

        setTimeout(() => {
          onUpdatePosition(uuid, 0, 0);
        }, 0);
      } else {
        onUpdatePosition(uuid, x, y);
      }
    };
    
  return () => {
    draggableInstance.unset();
  };
  }, [selector, onUpdatePosition]);
};

export default useDraggable;