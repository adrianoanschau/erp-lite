import { useState, useEffect } from 'react';

export const useKeyboardModifiers = () => {
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [numLockActive, setNumLockActive] = useState(false);

  useEffect(() => {
    const checkModifiers = (e: KeyboardEvent | MouseEvent) => {
      if (typeof e.getModifierState === 'function') {
        setCapsLockActive(e.getModifierState('CapsLock'));
        setNumLockActive(e.getModifierState('NumLock'));
      }
    };

    window.addEventListener('keydown', checkModifiers);
    window.addEventListener('keyup', checkModifiers);
    window.addEventListener('mousedown', checkModifiers);

    return () => {
      window.removeEventListener('keydown', checkModifiers);
      window.removeEventListener('keyup', checkModifiers);
      window.removeEventListener('mousedown', checkModifiers);
    };
  }, []);

  return { capsLockActive, numLockActive };
};