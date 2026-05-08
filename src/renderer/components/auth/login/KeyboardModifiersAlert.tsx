import React from 'react';
import { useKeyboardModifiers } from './useKeyboardModifiers';

export const KeyboardModifiersAlert: React.FC = () => {
  const { capsLockActive, numLockActive } = useKeyboardModifiers();

  if (!capsLockActive && numLockActive) {
    return null;
  }

  return (
    <div className="flex gap-2 mt-2 animate-in fade-in">
      {capsLockActive && (
        <span
          title="Caps Lock está ativado"
          className="flex items-center justify-center px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200/60 rounded text-sm font-bold shadow-sm cursor-help"
        >
          ⇪
        </span>
      )}
      {!numLockActive && (
        <span
          title="Num Lock está desativado"
          className="flex items-center justify-center px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200/60 rounded text-xs font-bold shadow-sm cursor-help"
        >
          <span className="line-through decoration-amber-500/70 decoration-2">123</span>
        </span>
      )}
    </div>
  );
};