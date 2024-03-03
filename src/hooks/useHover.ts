import { useRef, useState, useEffect } from 'react';

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);
  const handleFocus = () => setIsHovering(true);
  const handleBlur = () => setIsHovering(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      node.addEventListener('focusin', handleFocus);
      node.addEventListener('focusout', handleBlur);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
        node.removeEventListener('focusin', handleFocus);
        node.removeEventListener('focusout', handleBlur);
      };
    }
  }, [ref]);

  return { ref, isHovering };
};

export default useHover;