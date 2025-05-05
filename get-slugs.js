import { walk } from "https://deno.land/std/fs/mod.ts";

const getSlugs = async (dir) => {
    const slugs = [];

    for await (const entry of walk(dir, { exts: [".mdx"], includeDirs: false })) {
        const relative = entry.path
        .replace(/^.*\/pages\//, "")
        .replace(/\.mdx$/, "");
        slugs.push(relative);
    }

    return slugs;
};

const slugs = await getSlugs("./docs/pages");

await Deno.writeTextFile("slugs.json", JSON.stringify(slugs, null, 2));