export const handleNumbers = (value: string) => {
  let res = String(value || '').replace(/[^0-9.]+/g, '');

  if (!res.length) return '';

  if (res === '.') {
    return '0.1';
  }


  let [integerSide, floatSide] = (res + '').split('.');

  return integerSide + (typeof floatSide === 'string' ? '.' + floatSide : '');
};