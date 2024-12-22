'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from './utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { useState, useEffect, useRef } from 'react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const [openMenus, setOpenMenus] = useState({})
  const menuRefs = useRef({})
  const buttonRefs = useRef({})

  useEffect(() => {
    function handleClickOutside(event) {
      Object.keys(openMenus).forEach((slug) => {
        if (
          openMenus[slug] &&
          menuRefs.current[slug] &&
          buttonRefs.current[slug] &&
          !menuRefs.current[slug].contains(event.target) &&
          !buttonRefs.current[slug].contains(event.target)
        ) {
          setOpenMenus((prev) => ({
            ...prev,
            [slug]: false,
          }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenus])

  const toggleMenu = (slug) => {
    setOpenMenus((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            pidara ebannii by Mihai
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="grid grid-cols-5 space-x-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
                    <div className="col-span-4 space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <div className="space-y-5 xl:col-span-4">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="dark:prose-dark prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                        <div className="flex flex-row justify-between">
                          <dl className="flex flex-row items-center justify-start gap-4">
                            <dt className="sr-only">Published on</dt>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 64 64"
                            >
                              <path
                                fill="#FFC017"
                                d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 5.771a1.99 1.99 0 0 1 0 3.732l-15.87 5.771a2.02 2.02 0 0 0-1.195 1.194"
                              ></path>
                            </svg>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                            </dd>
                            <div className="flex flex-row items-center gap-4">
                              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="m3.672 10.167 2.138 2.14h-.002c1.726 1.722 4.337 2.436 5.96.81 1.472-1.45 1.806-3.68.76-5.388l-1.815-3.484c-.353-.524-.849-1.22-1.337-.958-.49.261 0 1.56 0 1.56l.78 1.932L6.43 2.866c-.837-.958-1.467-1.108-1.928-.647-.33.33-.266.856.477 1.598.501.503 1.888 1.957 1.888 1.957.17.174.083.485-.093.655a.56.56 0 0 1-.34.163.43.43 0 0 1-.317-.135s-2.4-2.469-2.803-2.87c-.344-.346-.803-.54-1.194-.15-.408.406-.273 1.065.11 1.447.345.346 2.31 2.297 2.685 2.67l.062.06c.17.175.269.628.093.8-.193.188-.453.33-.678.273a.9.9 0 0 1-.446-.273S2.501 6.84 1.892 6.23c-.407-.406-.899-.333-1.229 0-.525.524.263 1.28 1.73 2.691.384.368.814.781 1.279 1.246" />
                                </svg>
                                <span>6.5K</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.344 11.458A5.28 5.28 0 0 0 14 7.526C14 4.483 11.391 2 8.051 2S2 4.483 2 7.527c0 3.051 2.712 5.526 6.059 5.526a6.6 6.6 0 0 0 1.758-.236q.255.223.554.414c.784.51 1.626.768 2.512.768a.37.37 0 0 0 .355-.214.37.37 0 0 0-.03-.384 4.7 4.7 0 0 1-.857-1.958v.014z" />
                                </svg>
                                <span>67</span>
                              </div>
                            </div>
                          </dl>
                          <div className="flex flex-row justify-between gap-8">
                            <button
                              aria-label="Show less like this"
                              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                // fill="currentColor"

                                className="stroke-current fill-white dark:fill-gray-950"
                              >
                                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M8.25 12h7.5" />
                              </svg>
                            </button>
                            <button
                              aria-label="Add to list bookmark button"
                              className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z" />
                              </svg>
                            </button>

                            <div className="relative inline-block text-left">
                              <button
                                ref={(el) => (buttonRefs.current[slug] = el)}
                                type="button"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                id={`menu-button-${slug}`}
                                aria-expanded={openMenus[slug]}
                                aria-haspopup="true"
                                onClick={() => toggleMenu(slug)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                                  />
                                </svg>
                              </button>

                              {openMenus[slug] && (
                                <div
                                  ref={(el) => (menuRefs.current[slug] = el)}
                                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby={`menu-button-${slug}`}
                                  tabIndex="-1"
                                >
                                  <div className="py-1" role="none">
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                    >
                                      Show Less
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                    >
                                      Show More
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 dark:text-primary-400 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                    >
                                      Follow Author
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      tabIndex="-1"
                                    >
                                      Block Author
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-48 w-full">
                      <img
                        src="https://picsum.photos/200"
                        alt="article image"
                        className="absolute inset-0 h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <NewsletterForm />
          </div>
        </div>
      )}
    </>
  )
}
