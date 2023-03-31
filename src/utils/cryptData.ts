import { AES, enc } from 'crypto-js';

const SECRET_KEY = 'kienvan';

const encryptData = (name: string, data: any) => {
  const encrypted = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  localStorage.setItem(name, encrypted);
};

const decryptData = (name: string) => {
  const encrypted = localStorage.getItem(name);

  if (!encrypted) {
    return null;
  }

  const decrypted = AES.decrypt(encrypted, SECRET_KEY).toString(enc.Utf8);

  return JSON.parse(decrypted);
};

export { encryptData, decryptData };
