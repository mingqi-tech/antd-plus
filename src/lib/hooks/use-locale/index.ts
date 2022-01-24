import { useContext } from 'react';
import { Context } from '../../context';

/**
 * 使用上下文
 */
export function useLocale() {
  return useContext(Context);
}
