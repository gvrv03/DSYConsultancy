import Link from "next/link";
import React from "react";

const NewsBlog = (props) => {
  const { author, title, description, url, urlToImage, publishedAt, content } =
    props;

  const date = new Date(publishedAt);

  const dateNew =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  return (
    <Link href={url} legacyBehavior>
      <article className="flex flex-col h-auto bg-white cursor-pointer ">
        <p
          rel="noopener noreferrer"
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            className="object-cover cursor-pointer w-full h-52 "
            src={urlToImage}
          />
        </p>
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
      </article>
    </Link>
  );
};

export default NewsBlog;
