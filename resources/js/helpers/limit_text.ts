export const limitText = (text: string, count: number = 250) => {
    return text.slice(0, count) + (text.length > count ? '...' : '');
};
