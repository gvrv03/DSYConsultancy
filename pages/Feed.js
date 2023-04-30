import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import { getNews } from "directsecondyearadmission/quieries/getNews";
import Link from "next/link";
import React from "react";

const NewsBlogFeed = (props) => {
  const {
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    key,
    content,
  } = props;

  const date = new Date(publishedAt);

  const dateNew =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  return (
    <Link href={url} legacyBehavior>
      <section className="flex  gap-5 justify-between h-auto p-5 bg-white cursor-pointer ">
        <div className="grid place-items-center"
          rel="noopener noreferrer"
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            className="object-cover cursor-pointer w-32 h-32 "
            src={urlToImage}
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <p
            rel="noopener noreferrer"
            aria-label="Te nulla oportere reprimique his dolorum"
          ></p>
          <a
            rel="noopener noreferrer"
            className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400"
          >
            {author}
          </a>
          <h3 className="flex-1 cursor-pointer py-2 text-lg font-semibold leading-snug">
            {title}
          </h3>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
            <span>Published At : {dateNew} </span>
          </div>
        </div>
      </section>
    </Link>
  );
};
// NewsBlogFeed
const Feed = ({ newsData }) => {
  return (
    <HomeLayout>
      <div className="container m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {newsData.articles.map((item, index) => {
            const { author, title, description, url, urlToImage, publishedAt } =
              item;
            return (
              <NewsBlogFeed
                key={index}
                author={author}
                title={title}
                description={description}
                url={url}
                urlToImage={urlToImage}
                publishedAt={publishedAt}
              />
            );
          })}
        </div>
      </div>
    </HomeLayout>
  );
};
export async function getServerSideProps() {
  const newsData = await getNews();
  return {
    props: { newsData },
  };
}
export default Feed;
