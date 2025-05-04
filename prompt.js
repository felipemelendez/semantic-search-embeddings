import { parseDocs } from './docs-parser.js';
import { completion, generateEmbeddings } from './embeddings.js';
import supabase from './supabase.js';

const buildPrompt = (query, docsContext) => {
    const prompt_boilerplate = "You are a helpful assistant. Answer the question posed in the user query section using the provided context.";
    const user_query_boilerplate = "USER QUERY: ";
    const document_context_boilerplate = "CONTEXT: ";
    const final_answer_boilerplate = "FINAL ANSWER: ";

    const filled_prompt_template = `
    ${prompt_boilerplate}
    ${user_query_boilerplate} ${query}
    ${document_context_boilerplate} ${docsContext}
    ${final_answer_boilerplate}
    `;
    return filled_prompt_template;
}

const runPrompt = async (query) => {
    const vector = await generateEmbeddings(query);

    const {data, error} = await supabase.rpc('match_documents', {
        query_embedding: vector,
        match_threshold: 0.3,
        match_count: 2
    });

    const docs = await Promise.all(data.map((doc) => 
        parseDocs(doc.id)
    ))
    const docsBoddies = docs.map((doc) => doc.body);
    const contents = ''.concat(...docsBoddies);



    // const filledPrompt = buildPrompt(query, '') --> General LLM will not know the answer to `runPrompt("How do we deploy?")` :: (not a RAG system)
    const filledPrompt = buildPrompt(query, contents)

    const answer = await completion(filledPrompt);

    console.log('Answer:', answer);
}

runPrompt("How do we initialize a project?")