export type Indexable = {
  [key: string]: any;
};

export type TypedIndexable<T> = {
  [K in keyof T]: any
}