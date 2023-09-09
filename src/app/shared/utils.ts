export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export const capitalizeFirst = (name: string): string => {
  const firstCharUpperCase = name.charAt(0).toUpperCase();
  const restOfTheName = name.substring(1);
  return `${firstCharUpperCase}${restOfTheName}`;
}
