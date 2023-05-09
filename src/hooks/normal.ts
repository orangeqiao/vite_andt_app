import { useEffect } from 'react';

const useMount = (fn: () => void) => {

  useEffect(() => {
    fn?.();
  }, []);
};

export { useMount };
