export function normalizeSql(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/--.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/;$/, "")
    .trim();
}

export function sqlMatches(input: string, accepted: readonly string[]) {
  const normalized = normalizeSql(input);
  return accepted.some((item) => normalizeSql(item) === normalized);
}

export function rowsEqual(
  actual: Record<string, unknown>[],
  expected: Record<string, unknown>[],
) {
  if (actual.length !== expected.length) return false;
  return expected.every((row, index) => {
    const other = actual[index];
    if (!other) return false;
    const keys = Object.keys(row);
    return keys.every((key) => String(other[key]) === String(row[key]));
  });
}
