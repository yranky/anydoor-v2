/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-08-19 21:27:31
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-08-19 21:48:25
 * @FilePath: \anydoor-v2\src\common\utils\isVersionMatch.ts
 * @Description: 版本控制
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export function isVersionMatch(version: number, controlString: string): boolean {
  try {

    if (controlString === "") return true
    const ranges = (controlString + "").split(',');
    let match = false;
    let previousEnd = null;

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i].trim();

      if (range === '') {
        continue;
      }

      if (range.startsWith('-')) {
        const start = previousEnd ? previousEnd + 1 : -Infinity;
        const end = parseFloat(range.slice(1));
        if (version >= start && version <= end) {
          return true;
        }
      } else if (range.endsWith('-')) {
        const start = parseFloat(range.slice(0, -1));
        if (version >= start) {
          match = true;
          previousEnd = start;
        } else {
          return false;
        }
      } else if (range.includes('-')) {
        const [start, end] = range.split('-').map(parseFloat);
        if (version >= start && version <= end) {
          return true;
        } else if (version > end && match) {
          return true;
        }
        previousEnd = end;
      } else {
        const exactVersion = parseFloat(range);
        if (version === exactVersion) {
          return true;
        }
      }
    }
    return match;
  } catch {
    return false
  }
}