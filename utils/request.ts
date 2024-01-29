export function extractError(detail: Object): string {
  if (detail instanceof Array) {
    return (detail?.[0]?.msg as string) || 'Unknown error';
  }
  return detail as unknown as string;
}