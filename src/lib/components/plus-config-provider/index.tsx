import { ConfigProvider } from 'antd';
import { Context } from '../../context';
import { HttpClient } from '@quicker-js/http';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import { ReactNode } from 'react';
import { LocaleLanguageKey } from '@mingqi/rc-router-dom';
import { Omit } from 'react-redux';

/**
 * PlusConfigProvider
 * @param props
 * @constructor
 */
export function PlusConfigProvider(props: PlusConfigProviderProps) {
  const { http, locale, antLocale, ...rest } = props;
  return (
    <Context.Provider value={{ http, locale, antLocale }}>
      <ConfigProvider {...rest} locale={antLocale} />
    </Context.Provider>
  );
}

export interface PlusConfigProviderProps
  extends Omit<ConfigProviderProps, 'locale'> {
  http?: HttpClient;
  children?: ReactNode;
  locale?: Record<string, any> & { language: LocaleLanguageKey };
  antLocale?: ConfigProviderProps['locale'];
}
