export function calculateSize(bitrate, duration) {
    // Calculate size in bytes using the formula: size = (bitrate / 8) * duration
    return (bitrate / 8) * duration;
}

export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}

export function sanitizeFilename(filename) {
  const invalidCharsRegex = /[\/?<>\\:*|"<>]/g;

  const sanitizedFilename = filename.replace(invalidCharsRegex, '_');

  return sanitizedFilename;
}