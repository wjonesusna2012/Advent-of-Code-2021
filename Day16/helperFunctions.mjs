var versionCount = 0;
export const convertHexToBinaryArray = hexString => {
  return hexString.split('').map(h => ('0000'+parseInt(h, 16).toString(2)).slice(-4)).join('');
};

export const processType4Packet = (sequence, startIndex) => {
  let currentIndex = startIndex;
  let terminateOnLastPacket = false;
  let data = '';

  while(!terminateOnLastPacket) {
    data += sequence.substring(currentIndex + 1, currentIndex + 5);
    terminateOnLastPacket = sequence.charAt(currentIndex) === '0';
    currentIndex += 5;
  }
  const dataNum = parseInt(data, 2);
  return { currentIndex, value: dataNum};
}; 

export const processOperatorPacket = (sequence, startIndex, typeID) => {
  let currentIndex = startIndex;
  const lengthTypeID = sequence.charAt(currentIndex); 
  currentIndex++;
  const resultArray = [];
  if(lengthTypeID === '1') {
    // 11 bits representing # of subpackets
    const numberOfSubpackets = parseInt(sequence.substring(currentIndex, currentIndex + 11), 2);
    currentIndex += 11;
    for( let l = 0; l < numberOfSubpackets; l++) {
      const result = processPacket(sequence, currentIndex);
      currentIndex = result.currentIndex;
      resultArray.push(result.value);
    }
  }
  else if(lengthTypeID === '0') {
    // 15 bits reprsenting # of bits in subpackets
    const numberOfBitsInSubpackets = parseInt(sequence.substring(currentIndex, currentIndex + 15), 2);
    currentIndex += 15;
    
    const endingIndex = currentIndex + numberOfBitsInSubpackets;
    while(currentIndex < endingIndex) {
      let result = processPacket(sequence, currentIndex); 
      currentIndex = result.currentIndex;
      resultArray.push(result.value);
    }
  } 
  let retVal;
  switch(typeID) {
    case 0: // Sum packet
      retVal = resultArray.reduce((prev, curr) => prev + curr, 0);
      break;
    case 1: // Product packet
      retVal = resultArray.reduce((prev, curr) => prev * curr, 1);
      break;
    case 2: // Min packet
      retVal = Math.min(...resultArray);
      break;
    case 3: // Max packet
      retVal = Math.max(...resultArray);
      break;
    case 5: // GT packet
      retVal = resultArray[0] > resultArray[1] ? 1 : 0;
      break;
    case 6: // LT packetk
      retVal = resultArray[0] < resultArray[1] ? 1 : 0;
      break;
    case 7: // ET packet
      retVal = resultArray[0] === resultArray[1] ? 1 : 0;
      break;
  }
  return { currentIndex, value: retVal };
};

export const extractVersionAndType = (sequence, startIndex) => {
  const version = parseInt(sequence.substring(startIndex, startIndex + 3), 2);
  const type = parseInt(sequence.substring(startIndex + 3, startIndex + 6), 2);
  return { version, type, currentIndex: startIndex + 6 };
};

export const processPacket = (sequence, startIndex) => {
  const { version, type, currentIndex } = extractVersionAndType(sequence, startIndex);
  if (type === 4) {
    return processType4Packet(sequence, currentIndex);
  }
  return processOperatorPacket(sequence, currentIndex, type);
}