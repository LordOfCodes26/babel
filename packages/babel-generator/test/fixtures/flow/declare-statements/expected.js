declare var foo;
declare var foo;
declare function foo(): void;
declare function foo(): void;
declare function foo<T>(): void;
declare function foo(x: number, y: string): void;
declare class A {}
declare class A<T> extends B<T> { x: number }
declare class A { static foo: () => number; static x: string; }
declare class A { static [indexer: number]: string }
declare class A { static (): number }
declare class A mixins B<T>, C {}
declare type A = string;
declare type T<U> = { [k: string]: U };
declare type B = {
  fn?: (foo: string) => void
};
declare interface I { foo: string }
declare interface I<T> { foo: T }
declare module.exports: { foo: string }
declare opaque type Foo<T>: Bar<T>;
declare opaque type ID;
declare opaque type num: number;
declare opaque type NumArray;
