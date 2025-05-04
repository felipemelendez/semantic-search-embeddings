import OpenAI from 'openai';

const openai = new OpenAI();


export const generateEmbeddings = async (imput) => {
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: imput,
        encoding_format: 'float',
    });
    const vector = embedding.data[0].embedding;
    return vector;
}

export const completion = async (prompt) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.2,
    });
    return response.choices[0];
}
