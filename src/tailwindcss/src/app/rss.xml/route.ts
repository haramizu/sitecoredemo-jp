import { fetchGraphQL } from 'src/utils';

interface Article {
  id: string;
  url: {
    hostName: string;
    path: string;
  };
  title: {
    value: string;
  };
  publishDate: {
    value: string;
  };
  description: {
    value: string;
  };
  image: {
    jsonValue: {
      value: {
        src: string;
        alt: string;
        width: string;
        height: string;
      };
    };
  };
}

interface AllArticleResponse {
  data: {
    search: {
      total: number;
      results: Partial<Article>[];
    };
  };
}

const AllArticleQuery = (language: string, siteRootId: string, templateId: string) => {
  return `
      query {
        search(
          where: {
            name: "_templates"
            value: "${templateId}"
            operator: EQ
            AND: [
              {
                name: "_path"
                value: "${siteRootId}"
                operator: CONTAINS
              }
              { name: "_language", value: "${language}", operator: EQ }
            ]
          }
          orderBy: { direction: DESC, name: "publishDate" }
        ) {
          total
          results {
            id
            url {
              hostName
              path
            }
            title: field(name: "Title") {
              value
            }
            publishDate: field(name: "PublishDate") {
              value
            }
            description: field(name: "Description") {
              value
            }
            image: field(name: "Image") {
              jsonValue
            }
          }
        }
      }
    `;
};

export async function GET() {
  const posts = await getAllArticle(
    'en',
    'E66EE43B-398B-486E-9F7F-5FE36A4093D3',
    'B9453B23-0E09-4D98-99C0-EAA0F16DD6DA'
  );

  return new Response(JSON.stringify({ posts }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function getAllArticle(language: string, siteRootId: string, templateId: string) {
  const results: AllArticleResponse = (await fetchGraphQL(
    AllArticleQuery(language, siteRootId, templateId)
  )) as AllArticleResponse;

  const articles: Partial<Article>[] = [];

  results.data.search.results.forEach((article: Partial<Article>) => {
    articles.push({
      id: article.id,
      url: article.url,
      title: article.title,
      description: article.description,
      publishDate: article.publishDate,
      image: article.image,
    });
  });

  return articles;
}
