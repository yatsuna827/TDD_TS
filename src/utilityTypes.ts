/** T が U の部分型であり、なおかつTがユニオン型でない文字列リテラル型であることを判定する型関数.
 * U に string を指定するとUnion型の分解が起きないのでやめてね.
 */
type _Unit<T extends U, U> = U extends string ? (T[] extends U[] ? true : never) : never
export type Unit<T extends U, U> = Eq<_Unit<T, U>, true>

/**
 * T1とT2が同じ型かどうか判定する型関数.
 *
 */
export type Eq<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
