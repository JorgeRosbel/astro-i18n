import { AstroGlobal } from 'astro';

// Utility type to decrement a number type
type Prev<N extends number> = N extends 5
  ? 4
  : N extends 4
    ? 3
    : N extends 3
      ? 2
      : N extends 2
        ? 1
        : 0;

// DotNotation type to represent nested object keys in dot notation
export type DotNotation<T, Prefix extends string = '', Depth extends number = 5> = Depth extends 0
  ? never
  : {
      [K in keyof T & string]: T[K] extends Record<string, any>
        ? `${Prefix}${K}` | DotNotation<T[K], `${Prefix}${K}.`, Prev<Depth>>
        : `${Prefix}${K}`;
    }[keyof T & string];

export type SSGParams = {
  astro: AstroGlobal<any, any, any>;
  locale?: string;
};

export type SSRParams<T> = {
  translations: T;
  locale: string;
};

export interface I18NParams<T> {
  ssg?: SSGParams;
  ssr?: SSRParams<T>;
}
