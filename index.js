import { generateEmbeddings } from './embeddings.js';
import supabase from './supabase.js';
import slugs from './slugs.js';
import { parseDocs } from './docs-parser.js';


const handleDocs = async(slug) => {
    const data = await parseDocs(slug);

    const vector = await generateEmbeddings(data.body);

    // Store the vector in Supabase
    const { data: insertData, error: insertError } = await supabase
        .from('docs')
        .insert([
            { 
                id: slug, 
                title: data.attributes.title, 
                url: `https://docs.expo.dev/${slug}`,
                embedding: vector 
            }
        ]).select();
    if (insertError) {
        console.error('Error inserting data:', insertError);
        return;
    }
    console.log('Inserted data:', insertData);
};

const handleDocsList = async () => {
    await Promise.all(slugs.map(async (slug) => {
        try {
            await handleDocs(slug);
        } catch (error) {
            console.error(`Error processing ${slug}:`, error);
        }
    }));
}

handleDocsList();

