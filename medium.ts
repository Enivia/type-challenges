/** Get Return Type */
type MyReturnType<T> = T extends (...args: any) => infer P ? P : never;

/** Omit */
type MyOmit<T, K extends keyof T> = { [Key in Exclude<keyof T, K>]: T[Key] };

/** Readonly 2 */
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [k in K]: T[k];
} & Omit<T, K>;

/** Deep Readonly */
type DeepReadonly<T> = keyof T extends never ? T : { readonly [K in keyof T]: DeepReadonly<T[K]> };

/** Tuple To Union */
type TupleToUnion<T extends any[]> = T[number];

/** Chainable Options */
type Chainable<T = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<T & { [k in K]: V }>;
  get(): T;
};

/** Last of Array */
type Last<T extends any[]> = T extends [...infer _, infer K] ? K : never;

/** Pop */
type Pop<T extends any[]> = T extends [...infer K, infer _] ? K : never;

/** Promise.all */
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;

/** Type Lookup */
type LookUp<U, T> = U extends { type: T } ? U : never;

/** Trim Left */
type Whitespace = "\n" | " " | "\t";
type TrimLeft<S> = S extends `${Whitespace}${infer U}` ? TrimLeft<U> : S;

/** Trim */
type Trim<T> = T extends `${Whitespace}${infer U}`
  ? Trim<U>
  : T extends `${infer U}${Whitespace}`
  ? Trim<U>
  : T;

/** Capitalize */
type MyCapitalize<S extends string> = S extends `${infer C}${infer U}` ? `${Uppercase<C>}${U}` : S;

/** Replace */
type Replace<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : S;

/** ReplaceAll */
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S;

/** Append Argument */
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;

/** REVIEW: Permutation */
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;

/** Length of String */
type LengthOfString<S extends string, T extends string[] = []> = S extends `${infer L}${infer R}`
  ? LengthOfString<R, [...T, L]>
  : T["length"];

/** Flatten */
type Flatten<T> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [Flatten<F>, ...Flatten<R>]
  : [T];

/** Append to object */
type AppendToObject<T, U extends string, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

/** Absolute  */
type Absolute<
  T extends number | string | bigint,
  U extends string = ""
> = `${T}` extends `${infer F}${infer R}`
  ? F extends `-` | "_" | "n"
    ? Absolute<R, U>
    : Absolute<R, `${U}${F}`>
  : U;

/** String to Union */
type StringToUnion<T extends string> = T extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never;

/** Merge */
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};
