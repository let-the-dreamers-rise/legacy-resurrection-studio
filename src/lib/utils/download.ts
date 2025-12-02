export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: any, filename: string) {
  const content = JSON.stringify(data, null, 2);
  downloadFile(content, filename, 'application/json');
}

export function downloadYAML(content: string, filename: string) {
  downloadFile(content, filename, 'application/x-yaml');
}

export function downloadMarkdown(content: string, filename: string) {
  downloadFile(content, filename, 'text/markdown');
}

export function downloadTypeScript(content: string, filename: string) {
  downloadFile(content, filename, 'text/typescript');
}
