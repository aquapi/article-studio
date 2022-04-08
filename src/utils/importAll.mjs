import fs from "fs";
import path from "path";

export default async dir => {
    const res = [];
    for (const file of fs.readdirSync(dir)) {
        // Absolute path
        const absolutePath = path.resolve(dir, file).replaceAll("\\", "/");

        // Import
        const result = await import(
            absolutePath.slice(
                absolutePath.indexOf(":") + 1, 
                absolutePath.length
            )
        ).then(mod => mod.default ?? mod);

        if (Array.isArray(result))
            res.push(...result);
        else   
            res.push(result);
    };

    return res;
}
