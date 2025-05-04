# Expo Documentation RAG Chatbot

A retrieval-augmented generation (RAG) system that answers questions about Expo using their official documentation.

## Overview

This project provides a chatbot that can answer questions about Expo by leveraging:

1. A vector database of Expo documentation stored in Supabase
2. OpenAI embeddings to find the most relevant documentation
3. OpenAI's language models to generate helpful, contextually accurate responses

## Features

- **Documentation Processing**: Automatically fetches and processes Expo documentation from GitHub
- **Vector Search**: Uses embeddings to find the most relevant documentation for user queries
- **Contextual Responses**: Generates responses based on retrieved documentation context
- **Easy to Extend**: Modular design makes it easy to add more documentation sources

## Technical Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Expo Docs   │────▶│ Embeddings  │────▶│ Supabase    │
│ (GitHub)    │     │ (OpenAI)    │     │ Vector DB   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ User Query  │────▶│ Similar Doc │◀────│ Vector      │
│             │     │ Finder      │     │ Search      │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Response    │
                    │ Generation  │
                    └─────────────┘
```

## Setup

1. **Prerequisites**:
   - Node.js
   - OpenAI API key
   - Supabase account and project

2. **Installation**:
   ```bash
   npm install
   ```

3. **Configuration**:
   - Create a `.env` file with your API keys (use `.env.local` format as shown in `.gitignore`)
   - Ensure your Supabase database has a `docs` table with the proper structure

4. **Initialize the database**:
   ```bash
   node index.js
   ```

## Usage

### Indexing Documentation

The `index.js` script processes documentation pages from Expo's GitHub repository and stores them as embeddings in Supabase:

```bash
node index.js
```

### Querying the System

Use the `prompt.js` script to ask questions:

```bash
node prompt.js "How do I deploy my Expo app to the App Store?"
```

Modify the query in the script to ask different questions.

## Project Structure

- **docs-parser.js**: Fetches and parses Expo documentation from GitHub
- **embeddings.js**: Handles OpenAI API calls for embeddings and completions
- **index.js**: Processes documentation and stores it in the vector database
- **prompt.js**: Handles user queries and generates responses
- **slugs.js**: Contains a list of documentation pages to process
- **supabase.js**: Configures the Supabase client

## Dependencies

- **@supabase/supabase-js**: Supabase client library
- **front-matter**: Parses frontmatter from markdown files
- **openai**: OpenAI API client

## Example Queries

The system can answer questions like:
- "How do we initialize a project?"
- "How do I deploy my app to app stores?"
- "What environments does Expo support?"
