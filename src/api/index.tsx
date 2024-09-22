export type TArticle = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  createdAt: string;
  summary: string;
};

const JSON_API_URL = `http://localhost:5500`;

export async function ListArticles(start: number, end: number) {
  const articles = await fetch(
    // `${process.env.JSON_API_URL}/articles?_start=${start}&_end=${end}`
    `${JSON_API_URL}/articles?_start=${start}&_end=${end}`
  ).then((response) => {
    return response.json();
  });

  return articles;
}

export async function GetArticleCount() {
  const articles = await fetch(
    // `${process.env.JSON_API_URL}/articles`
    `${JSON_API_URL}/articles`
  ).then((response) => {
    return response.json();
  });

  return articles.length;
}

export async function PostArticle(payload: TArticle) {
  const ok = await fetch(
    // `${process.env.JSON_API_URL}/articles`,
    `${JSON_API_URL}/articles`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  ).then((response) => {
    console.log(response.json());
    return response.ok;
  });

  return ok;
}

export async function PatchArticle(payload: TArticle) {
  const ok = await fetch(
    // `${process.env.JSON_API_URL}/articles`,
    `${JSON_API_URL}/articles/${payload.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  ).then((response) => {
    console.log(response.json());
    return response.ok;
  });

  return ok;
}
