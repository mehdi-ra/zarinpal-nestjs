export function checkAuthorityCode(authorityCode: string) {
  return (
    typeof authorityCode === 'string' &&
    authorityCode.startsWith('A') &&
    authorityCode.length === 36
  );
}
