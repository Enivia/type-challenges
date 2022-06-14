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

/** KebabCase */
type Upper = "A" | "B" | "C" | "F"; // to complete
type KebabCase<S extends string, T extends boolean = true> = S extends `${infer F}${infer R}`
  ? `${F extends Upper ? `${T extends true ? "" : "-"}${Lowercase<F>}` : F}${KebabCase<R, false>}`
  : "";

/** Diff */
type Diff<O, O1> = {
  [K in Exclude<keyof O | keyof O1, keyof O & keyof O1>]: K extends keyof O
    ? O[K]
    : K extends keyof O1
    ? O1[K]
    : never;
};

/** AnyOf */
type False = 0 | "" | false | [] | Record<string, never>;
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends False
    ? AnyOf<R>
    : true
  : false;

/** IsNever */
type IsNever<T> = [T] extends [never] ? true : false;

/** IsUnion */
type helper1<T> = T extends any ? T[] : never; // dist
type helper2<T> = [T] extends [any] ? T[] : never; // no dist
export type IsUnion<T> = helper2<T> extends helper1<T> ? false : true;

/** ReplaceKeys */
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};

/** Remove Index Signature */
type RemoveIndexSignature<T> = {
  [P in keyof T as P extends `${infer R}` ? R : never]: T[P];
};

/** Percentage Parser */
type SignParse<T extends string> = T extends `+${infer R}`
  ? ["+", R]
  : T extends `-${infer R}`
  ? ["-", R]
  : ["", T];
type PercentageParser<A extends string> = A extends `${infer L}%`
  ? [...SignParse<L>, "%"]
  : [...SignParse<A>, ""];

/** Drop Char */
type DropChar<S extends string, C extends string> = S extends `${infer F}${infer R}`
  ? `${F extends C ? "" : F}${DropChar<R, C>}`
  : S;

/** MinusOne */

/** PickByType */
type PickByType<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] };

/** StartsWith */
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}` ? true : false;

/** EndsWith */
type EndsWith<T extends string, U extends string> = T extends `${infer L}${U}` ? true : false;

/** PartialByKeys */
type PartialByKeys<T, K extends keyof any = string> = Omit<
  { [k in K & keyof T]?: T[k] } & Omit<T, K>,
  never
>;

/** REVIEW: RequiredByKeys */
type RequiredByKeys<T, K extends keyof any = keyof T> = T & {
  [P in keyof T & K]-?: T[P] extends infer R | undefined ? R : T[P];
} extends infer R
  ? { [P in keyof R]: R[P] }
  : never;
