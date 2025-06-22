// SHA-512 hash function using Web Crypto API
export const hashSHA512 = async (text: string, salt: string = ''): Promise<string> => {
  const encoder = new TextEncoder();
  const dataWithSalt = text + salt;
  const data = encoder.encode(dataWithSalt);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Hash an array of values
export const hashValues = async (values: string[], salt: string = ''): Promise<string[]> => {
  const promises = values.map(value => hashSHA512(value, salt));
  return Promise.all(promises);
};

// Create preview data for a column
export const createColumnPreview = async (
  values: string[],
  salt: string = '',
  maxPreviewItems: number = 10
): Promise<Array<{ original: string; hashed: string }>> => {
  const previewValues = values.slice(0, maxPreviewItems);
  const hashedValues = await hashValues(previewValues, salt);
  
  return previewValues.map((original, index) => ({
    original,
    hashed: hashedValues[index],
  }));
};
