import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Default props for function component
  News.defaultProps = {
    country: 'pk',
    pageSize: 8,
    category: 'general',
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
  };

  const capitalizerFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async (newPage = page) => {
    if (props.setProgress) props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${newPage}&pageSize=${props.pageSize}&apiKey=4bd6867c8dae4c29972657e4f65cb7aa`;

    setLoading(true);
    let data = await fetch(url);

    if (props.setProgress) props.setProgress(50);
    let parsedData = await data.json();

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);

    if (props.setProgress) props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizerFirstLetter(props.category)} - NewsPulse`;
    updateNews(1);
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    
    const nextPage = page + 1;
    setPage(nextPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}&apiKey=4bd6867c8dae4c29972657e4f65cb7aa`;
//eslint disable-next-line
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop:'90px' }}>
        NewsPulse - Top {capitalizerFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title || ''}
                  descrption={element.description || ''}
                  imageurl={element.urlToImage}
                  NewsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name || 'Unknown'}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
