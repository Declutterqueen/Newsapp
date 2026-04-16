
import React from 'react';

const NewsItem = ({ title, descrption, imageurl, NewsUrl, author, date, source }) => {
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>

        <img
          src={!imageurl 
            ? "https://bl-i.thgim.com/public/incoming/c9tqtk/article70533873.ece/alternates/LANDSCAPE_1200/20260121015L.jpg"
            : imageurl}
          className="card-img-top"
          alt="news"
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{descrption}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a rel="noreferrer" href={NewsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
