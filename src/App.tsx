import { useState, useEffect } from "react";
import { GetArticleCount, ListArticles, TArticle } from "./api";
import moment from "moment";

const PER_PAGE = 10;

type ListState = {
  articles: TArticle[];
  count: number;
  page: number;
};

function App() {
  const [state, setState] = useState<ListState>({
    articles: [],
    count: 0,
    page: 0,
  });

  useEffect(() => {
    (async () => {
      const articles = await ListArticles(
        state.page * PER_PAGE,
        (state.page + 1) * PER_PAGE
      );

      const count = await GetArticleCount();

      setState((prev) => ({
        ...prev,
        articles: articles,
        count: count,
      }));
    })();
  }, [state.page]);

  const pages = [];
  for (let index = 0; index * PER_PAGE < state.count; index++) {
    pages.push(index);
  }

  function getHandlePaginate(target: number) {
    if (target * PER_PAGE > state.count || target < 0) {
      return () => {};
    }
    return () => {
      setState((prev) => ({
        ...prev,
        page: target,
      }));
    };
  }

  return (
    <div className="flex flex-col gap-6 py-24 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="font-semibold text-4xl">{`Articles (${state.count})`}</h1>
        <a
          href="/create"
          className="float-right font-semibold rounded-full bg-white hover:bg-gray-300 px-5 py-3 text-black"
        >
          Create +
        </a>
      </div>

      <ol className="flex flex-col gap-5">
        {state.articles.map((article: TArticle) => {
          return (
            <li
              key={`article-${article.id}`}
              className="hover:bg-gray-800 border-2 border-gray-500 p-5 rounded-lg"
            >
              <a href={`/update/${article.id}`} className="flex flex-col gap-3">
                <h2 className="font-semibold text-3xl w-full m-auto">
                  {article.title}
                </h2>
                <div className="flex gap-3">
                  <div className="">{article.publisher}</div>
                  <div className="border border-l border-r-0 border-gray-500"></div>
                  <div className="">
                    {moment(article.date).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="">{article.summary}</div>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mx-auto flex gap-3">
        <button
          onClick={getHandlePaginate(state.page - 1)}
          className="rounded-lg border border-gray-500 hover:bg-gray-800 p-2"
        >
          {"<"}
        </button>
        {pages.map((p: number) => {
          return (
            <button
              key={`page-${p}`}
              onClick={getHandlePaginate(p)}
              className={
                "rounded-lg border border-gray-500 p-2 " +
                (state.page == p ? "bg-white text-black" : "hover:bg-gray-800")
              }
            >
              {p + 1}
            </button>
          );
        })}
        <button
          onClick={getHandlePaginate(state.page + 1)}
          className="rounded-lg border border-gray-500 hover:bg-gray-800 p-2"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default App;
