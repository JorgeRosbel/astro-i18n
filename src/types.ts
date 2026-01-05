// Helper type para decrementar profundidad
type Prev<N extends number> = N extends 5 ? 4 : N extends 4 ? 3 : N extends 3 ? 2 : N extends 2 ? 1 : 0;

// Limita la recursión a 5 niveles para evitar "excessively deep" error
export type DotNotation<T, Prefix extends string = '', Depth extends number = 5> = 
    Depth extends 0 
    ? never 
    : {
        [K in keyof T & string]: T[K] extends Record<string, any>
        ? `${Prefix}${K}` | DotNotation<T[K], `${Prefix}${K}.`, Prev<Depth>>
        : `${Prefix}${K}`;
    }[keyof T & string];