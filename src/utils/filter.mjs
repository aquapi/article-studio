/**
 * @param {{name: string, content: string, views: number, author: string, votes: number, private: boolean}[]} articles
 */
const filter = articles => articles.filter(v => !v.private);

export default filter;