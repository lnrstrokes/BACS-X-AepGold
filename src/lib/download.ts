/**
 * Safe client-side JSON download using Blob and ObjectURL
 */
export function downloadJsonFile(filename: string, jsonContent: string): void {
  try {
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error('Failed to trigger file download:', err);
  }
}
