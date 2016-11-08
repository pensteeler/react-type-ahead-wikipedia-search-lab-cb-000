# Type-Ahead Wikipedia Search Lab

## Objectives

1. Put React and unidirectional data to use
2. Use AJAX in a small React library

## Overview

In this lesson we're going to build an autocomplete component using Wikipedia's
Search API.

This is what it's going to look like:

![Screenshot](https://s3.amazonaws.com/learn-verified/react-type-ahead-wikipedia-search-lab-screenshot.png)

## Stores

Our `<Autocomplete />` component uses a centralized `resultStore` store. The store has to keep track of two different things:

1. The actual search results as returned by Wikipedia's search API.

<<<<<<< HEAD
  Before storing the results that the Wikipedia search API returns, we should
  convert them to an array of objects. This is what Wikipedia gives us by default
  when hitting the [search endpoint](https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=test):
=======
Before storing the results that the Wikipedia search API returns, we should convert them to an array of objects. This is what Wikipedia gives us by default when hitting the [search endpoint](https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=test):
>>>>>>> master-fix

  ```json
  [
    "search query",
    [
      "search result 1",
      "search result 2",
      "search result 3"
    ],
    [
      "longer description of search result 1",
      "longer description of search result 2",
      "longer description of search result 3"
    ],
    [
      "https://en.wikipedia.org/wiki/search_result_1",
      "https://en.wikipedia.org/wiki/search_result_2",
      "https://en.wikipedia.org/wiki/search_result_3"
    ]
  ]
  ```

  While it's possible to store those results directly in the `resultStore`, having
  a simple array of objects to iterate over is arguably easier to reason about and
  write components for.

  Therefore, before storing the results in the store, we convert them into the
  following structure:

  ```json
  [
    {
      "title": "search result 1",
      "description": "longer description of search result 1",
      "link": "https://en.wikipedia.org/wiki/search_result_1"
    },
    {
      "title": "search result 2",
      "description": "longer description of search result 2",
      "link": "https://en.wikipedia.org/wiki/search_result_2"
    },
    {
      "title": "search result 3",
      "description": "longer description of search result 3",
      "link": "https://en.wikipedia.org/wiki/search_result_3"
    }
  ]
<<<<<<< HEAD
  ```

2. The last time the store was updated.

  Since AJAX requests are by definition asynchronous, the order in which we
  receive responses from Wikipedia's API might be different from the order in
  which we sent those requests in the first place.

  When we receive an "outdated" response to a previous XHR request, we simply
  discard it.

  Therefore we need to keep track of the last time the store was updated. The
  easiest way to achieve this, is by adding a separate `updated` property to the
  store.
=======
]
```

While it's possible to store those results directly in the `resultStore`, having a simple array of objects to iterate over is arguably easier to reason about and write components for.

Therefore, before storing the results in the store, we convert them into the following structure:

```json
[
  {
    "title": "search result 1",
    "description": "longer description of search result 1",
    "link": "https://en.wikipedia.org/wiki/search_result_1"
  },
  {
    "title": "search result 2",
    "description": "longer description of search result 2",
    "link": "https://en.wikipedia.org/wiki/search_result_2"
  },
  {
    "title": "search result 3",
    "description": "longer description of search result 3",
    "link": "https://en.wikipedia.org/wiki/search_result_3"
  }
]
```

2. The last time the store was updated.

Since AJAX requests are by definition asynchronous, the order in which we receive responses from Wikipedia's API might be different from the order in which we sent those requests in the first place.

When we receive an "outdated" response to a previous XHR request, we simply discard it.

Therefore we need to keep track of the last time the store was updated. The easiest way to achieve this, is by adding a separate `updated` property to the store.
>>>>>>> master-fix

## Components

Our `<Autocomplete />` component consists of a `<SearchField />` and `<SearchResults />` component.

The `<SearchField />` renders an input box where the user can search for arbitrary Wikipedia articles.

The `<SearchResults />` component renders the results as received by the API.

## Resources

- [Om.next Remote Synchronization](https://github.com/omcljs/om/wiki/Remote-Synchronization-Tutorial)
