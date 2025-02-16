import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Canvas} from 'fabric';

const useHotkeys = (canvasRef: React.RefObject<Canvas>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        //
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
};
