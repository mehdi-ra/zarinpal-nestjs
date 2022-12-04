import { checkAuthorityCode } from '../decorators';

/**
 * This function will encodes the authority code and
 * returns something like: `26x387664294`. this is
 * easier to store on database. In next future i will
 * add this feature to inject your own encoder and decoder.
 * @param authorityCode Authority code like (A00000000000000000000000000387664294)
 * @return {string} somethingLike `26x387664294`
 */
export const zarinpalAuthorityEncode: ZarinpalAuthorityEncoder = function(
  code: string,
) {
  try {
    if (!checkAuthorityCode(code)) {
      throw new Error('Authority code is not valid !');
    }

    let splittedCode = [...code];
    let newCode = [0, 'x'];

    for (let char of splittedCode) {
      if (char === 'A') continue;
      if (char === '0') {
        (newCode[0] as number)++;
        continue;
      }

      if (+char > 0) {
        newCode.push(char);
        continue;
      }
    }

    return newCode.join('');
  } catch (e) {
    throw localErrorHandler(e);
  }
};

/**
 * Decodes authority code
 * @param encodedAuthority encoded authority code like `26x387664294`
 * @returns real authority code (A00000000000000000000000000387664294)
 */
export const zarinpalAuthorityDecode: ZarinpalAuthorityDecoder = function(
  encodedAuthority: string,
) {
  try {
    const splittedCode = encodedAuthority.split('x');

    const zeroRepeat = '0'.repeat(+splittedCode[0]);
    const realPart = splittedCode[1];

    const newCode = ['A', zeroRepeat, realPart];
    return newCode.join('');
  } catch (e) {
    throw localErrorHandler(e);
  }
};

function localErrorHandler(e: unknown) {
  if (e instanceof Error || e instanceof TypeError) {
    return new Error('Error in encoding Authority: ' + e.message);
  } else {
    return e;
  }
}

export type ZarinpalAuthorityEncoder = (code: string) => string;
export type ZarinpalAuthorityDecoder = (encodedAuthority: string) => string;
