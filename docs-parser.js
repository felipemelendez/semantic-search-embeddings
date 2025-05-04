import fm from 'front-matter';

// On github: https://raw.githubusercontent.com/expo/expo/main/docs/pages/get-started/start-developing.mdx
// Public page: https://docs.expo.dev/get-started/start-developing/

export const parseDocs = async(slug) => {
    const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);

    }
    const content = await response.text();
    const data = fm(content);
    return data;
};