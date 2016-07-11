const unsafeFileNameParts = [/\//g, /\\/g, /:/g, /\*/g, /\?/g, /"/g, /</g, />/g, /\|/g];
const replacementCharacter = '-';

export default function fileNameNow(fileName, extension) {
  const now = new Date().toLocaleString();
  const fullFileName = `${fileName} - ${now}`;
  const safeFileName = unsafeFileNameParts.reduce(
    (saferNow, regexp) => saferNow.replace(regexp, replacementCharacter),
    fullFileName
  );
  return `${safeFileName}.${extension}`;
}
