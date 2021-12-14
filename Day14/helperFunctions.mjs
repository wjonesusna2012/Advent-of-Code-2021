const counterOccurenceInString = (polymerSequence, letter) => {
  let letterCount = 0;
  polymerSequence.split('').forEach(l => {
    if (l === letter) letterCount++;
  });
  return letterCount;
};

export const countLettersInString = polymerSequence => {
  const letterObject = {};
  const polymerSet = new Set(polymerSequence.split(''));
  [...polymerSet].forEach(pS => {
    letterObject[pS] = counterOccurenceInString(polymerSequence, pS);
  });
  return letterObject;
};

export const maxMinusMin = letterObject => {
  const vals = Object.values(letterObject);
  vals.sort((a, b) => b - a)
  return vals[0] - vals[vals.length - 1];
};

export const constructPolymerSequenceAndReplacements = lines => {
  const polymerSequence = lines[0];
  const replacements = {};
  // Skip lines[1] due to blank line
  for(let i = 2; i < lines.length; i++) {
    const [prefix, postfix] = lines[i].split('->');
    replacements[prefix.trim()] = postfix.trim(); 
  }
  return { polymerSequence, replacements };
};

export const replaceChain = (sequence, replacements) => {
  return sequence
    .split('')
    .map((val, i, seqArr) => {
      const replacementLetter = replacements[seqArr.slice(i, i+2).join('')];
      if (replacementLetter) return val + replacementLetter;
      return val;
    })
    .join('');
};

export const constructPairsObject = sequence => {
  const pairsObject = {};
  sequence.split('').forEach((val, index, arr) => {
    const pair = arr.slice(index, index + 2).join('');
    if(pairsObject[pair]) {
      pairsObject[pair] += 1;
    } else {
      pairsObject[pair] = 1;
    }
  });
  return pairsObject;
}
/*
  previousPairs: {
    'KN': 1,
    'NK': 2,
    'CK': 2,
    'KC': 1,
    'NC': 3,
    'CN': 4,
  }
  replacements: {
    'KN': 'C',
    'CK': 'N',
    ...
  }
  For KN in previous pairs transforms to 
*/

export const updatePairsObjectCount = (previousPairs, replacements) => {
  const updatedPairsObject = {...previousPairs};
  Object.keys(previousPairs).forEach(key => {
    if (replacements[key]) {
      const firstSplit = key.charAt(0) + replacements[key];
      const secondSplit = replacements[key] + key.charAt(1); 
      if (updatedPairsObject[firstSplit]) {
        updatedPairsObject[firstSplit] += previousPairs[key];
      } else {
        updatedPairsObject[firstSplit] = previousPairs[key];
      }
      if (updatedPairsObject[secondSplit]) {
        updatedPairsObject[secondSplit] += previousPairs[key];
      } else {
        updatedPairsObject[secondSplit] = previousPairs[key];
      }
      updatedPairsObject[key] -= previousPairs[key];
    }
  });
  return updatedPairsObject;
};

export const countLettersFromPairsObject = pairsObject => {
  const setOfLetters = new Set(Object.keys(pairsObject).map(e => e.charAt(0)));
  const countSingleLetterObject = {};
  const arrayOfSetLetters = [...setOfLetters];
  arrayOfSetLetters.forEach(aOSL => {
    countSingleLetterObject[aOSL] = 0;
  });
  Object.keys(pairsObject).forEach(pOK => {
    countSingleLetterObject[pOK.charAt(0)] += pairsObject[pOK];
  });
  return countSingleLetterObject;
}