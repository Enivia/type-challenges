/** Pick */
type MyPick<T, K extends keyof T> = { [k in K]: T[k] };

/** ReadOnly */
type MyReadonly<T> = { readonly [k in keyof T]: T[k] };

/** Tuple to Object */
type TupleToObject<T extends readonly (string | number)[]> = {
  [k in T[number]]: k;
};

/** First of Array */
type First<T extends any[]> = T extends [] ? never : T[0];

/** Length of Tuple */
type Length<T extends readonly any[]> = T["length"];

/** Exclude */
type MyExclude<T, U> = T extends U ? never : T;

/** Awaited */
type MyAwaited<T extends Promise<any>> = T extends Promise<infer P>
  ? P extends Promise<any>
    ? MyAwaited<P>
    : P
  : never;

/** If */
type If<C extends boolean, T, F> = C extends true ? T : F;

/** Concat */
type Concat<T extends any[], U extends any[]> = [...T, ...U];

/** Includes */
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;

/** Push */
type Push<T extends any[], U> = [...T, U];

/** Unshift */
type Unshift<T extends any[], U> = [U, ...T];

/** Parameters */
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
