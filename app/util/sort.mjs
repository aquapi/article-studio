/**
 * @param {string} ct category name
 * @param {Response<any, Record<string, any>, number>} res to write the result to the client
 * @param {{name: string, content: string, views: number, author: string, votes: number}[]} articles list
 */

const sort = (ct, articles) => {
    if (articles.length < 2)
        return articles;
    const
        pivotIndex = articles.length - 1,
        pivot = articles[pivotIndex],
        /**
         * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
         */
        left = [],
        /**
         * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
         */
        right = [];

    for (let i = 0; i < pivotIndex; i++)
        (articles[i][ct] < pivot[ct] ? right : left).push(articles[i]);

    return [...sort(ct, left), pivot, ...sort(ct, right)];
}

export default sort;