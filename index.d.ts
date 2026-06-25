//
// index.d.ts
// @trenskow/parallel
//
// Created by Kristian Trenskow on 2022/04/10
// For license see LICENSE.
//

declare function parallel<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]>; }>;

export default parallel;
