/** T が U の部分型であり、なおかつTがユニオン型でない文字列リテラル型であることを判定する型関数.
 * U に string を指定するとUnion型の分解が起きないのでやめてね.
 */
export type Unit<T extends string extends U ? never : U, U> = U extends string ? (T[] extends U[] ? (string extends U ? never : true) : never) : never

/**
 * T1とT2が同じ型かどうか判定する型関数.
 * 関数型とかを考えると厳密には正しくないらしい.
 */
export type Eq<T1, T2> = T1 extends T2 ? (T2 extends T1 ? true : false) : false
