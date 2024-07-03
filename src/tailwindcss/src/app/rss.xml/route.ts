import { Feed } from 'feed';
import { fetchGraphQL } from 'src/utils';

interface News {
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

interface AllNewsResponse {
  data: {
    search: {
      total: number;
      results: Partial<News>[];
    };
  };
}

const baseUrl = 'https://sitecoredemo.jp';

export async function GET() {
  const posts = await getAllArticle(
    'en',
    'E66EE43B-398B-486E-9F7F-5FE36A4093D3',
    'B9453B23-0E09-4D98-99C0-EAA0F16DD6DA'
  );

  const feed = new Feed({
    title: 'Sitecoredemo.jp RSS',
    description: 'This is RSS Feed about demo news',
    id: baseUrl,
    link: baseUrl,
    copyright: `${new Date().getFullYear()} Sitecoredemo.jp`,
    language: 'en',
    favicon: baseUrl + 'favicon.png',
    feedLinks: {
      rss2: baseUrl + 'rss.xml',
    },
    author: {
      name: 'Shinichi Haramizu',
      email: 'support@sitecoredemo.jp',
      link: baseUrl,
    },
  });

  posts.map((post) => {
    const publishDate = post.publishDate?.value || '20240110T00:00:00Z';

    const isoDateString = publishDate.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
      '$1-$2-$3T$4:$5:$6Z'
    );

    feed.addItem({
      title: post.title?.value || 'Title',
      id: post.id,
      link: baseUrl + post.url?.path,
      date: new Date(isoDateString),
      description: post.description?.value || '',
      image: {
        url: post.image?.jsonValue.value.src || '/next.svg',
      },
    });

    console.log(post.publishDate?.value);
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}

async function getAllArticle(language: string, siteRootId: string, templateId: string) {
  const results: AllNewsResponse = (await fetchGraphQL(
    AllNewsQuery(language, siteRootId, templateId)
  )) as AllNewsResponse;

  const news: Partial<News>[] = [];

  results.data.search.results.forEach((post: Partial<News>) => {
    news.push({
      id: post.id,
      url: post.url,
      title: post.title,
      description: post.description,
      publishDate: post.publishDate,
      image: post.image,
    });
  });

  return news;
}

const AllNewsQuery = (language: string, siteRootId: string, templateId: string) => {
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
