export function capitalize (str: string) {
    const capitalLetter = str.charAt(0).toUpperCase();
    const substring = str.slice(1);
    return capitalLetter + substring;
} 