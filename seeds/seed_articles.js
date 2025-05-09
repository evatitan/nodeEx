// seeds/seed_articles.js

export const seed = async function (knex) {
  await knex('articles').del();
  const articles = []
  const counts = 100
  for (let i = 1; i <= counts; i++) { 
    const article = {
      id: i,
      title: `article${i}`,
      content: `content${i}`,
      created: new Date(),
      updated: new Date()
    }
    articles.push(article)
  }
  
  await knex('articles').insert(articles);
};
