import { PostArticle, TArticle } from "./api";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event?.currentTarget;
  const formData = new FormData(form);

  const title = formData.get("title") as string;
  const publisher = formData.get("publisher") as string;
  const summary = formData.get("summary") as string;
  const date = formData.get("date") as string;

  console.log(date);

  const payload: TArticle = {
    title: title,
    publisher: publisher,
    summary: summary,
    date: date,
    createdAt: moment().utc().format(),
    id: uuidv4(),
  };

  const ok = await PostArticle(payload);
  if (!ok) {
    alert("Failed to create article. Please try again");
  }
  form.reset();
  alert(
    `Article created; id: ${payload.id}\nTo view all articles, please click on 'Articles'`
  );
}

export default function CreateArticle() {
  return (
    <div className="flex flex-col gap-6 py-24 max-w-4xl mx-auto">
      <div className="flex gap-5">
        <a
          href="/"
          className="underline w-fit hover:text-gray-300 cursor-pointer font-semibold text-4xl"
        >
          {"Articles"}
        </a>
        <h1 className="no-wrap font-semibold text-4xl">{">"}</h1>
        <h1 className="no-wrap grow font-semibold text-4xl">{"Create"}</h1>
      </div>
      <form
        id="createArticle"
        className="flex flex-col gap-5 border border-gray-500 rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-xl">
            Title
          </label>
          <input
            name="title"
            form="createArticle"
            type="text"
            className="rounded-lg text-black px-3 py-1"
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="publisher" className="font-semibold text-xl">
            Publisher
          </label>
          <input
            name="publisher"
            form="createArticle"
            type="text"
            className="rounded-lg text-black px-3 py-1"
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-semibold text-xl">
            Date
          </label>
          <input
            name="date"
            form="createArticle"
            type="date"
            className="rounded-lg text-black px-3 py-1"
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="summary" className="font-semibold text-xl">
            Summary
          </label>
          <textarea
            name="summary"
            form="createArticle"
            className="rounded-lg text-black px-3 py-1"
            required
          ></textarea>
        </div>
        <input
          type="submit"
          value="Submit"
          id="submit"
          className="rounded-full font-semibold cursor-pointer bg-white hover:bg-gray-300 text-black py-3 text-center my-3"
        ></input>
      </form>
    </div>
  );
}
