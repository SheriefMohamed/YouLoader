exports.sanitizeFilename = (filename) => {
    const invalidCharsRegex = /[\/?<>\\:*|"<>]/g;
  
    const sanitizedFilename = filename.replace(invalidCharsRegex, '_');
  
    return sanitizedFilename;
}