import { createContext } from 'react';
import { MethodMirror, PropertyMirror } from '@quicker-js/class-decorator';

export const PlusFormContext = createContext<
  Map<PropertyKey, PropertyMirror | MethodMirror>
>(new Map());
