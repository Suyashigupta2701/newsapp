import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import CategoryNav from './CategoryNav';  // CategoryNav component import


export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      selectedCategory: 'general',  // Default category
    };
  }

  componentDidMount() {
    this.fetchNewsData(this.state.selectedCategory, 1);  // Fetch first page of news
  }

  fetchNewsData = async (category, page) => {
    const cachedData = localStorage.getItem(`news-${category}-page-${page}`);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        page: page,
        loading: false
      });
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=207beadc501645da92d08656cbe0b27c&page=${page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const fetchedData = await data.json();
      localStorage.setItem(`news-${category}-page-${page}`, JSON.stringify(fetchedData));

      this.setState({
        articles: fetchedData.articles,
        totalResults: fetchedData.totalResults,
        page: page,
        loading: false
      });
    }
  };

  handleNextpage = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      const nextPage = this.state.page + 1;
      await this.fetchNewsData(this.state.selectedCategory, nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  handlePrevpage = async () => {
    if (this.state.page === 1) return;

    const prevPage = this.state.page - 1;
    await this.fetchNewsData(this.state.selectedCategory, prevPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category, page: 1 }, () => {
      this.fetchNewsData(category, 1);  // Fetch news for selected category
    });
  };

  render() {
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    return (
      <div>
       
        <CategoryNav  // Use CategoryNav below NavBar
          categories={categories}
          selectedCategory={this.state.selectedCategory}
          onCategoryChange={this.handleCategoryChange}
        />
        <div className="container my-3">
          <h2>{this.state.selectedCategory.charAt(0).toUpperCase() + this.state.selectedCategory.slice(1)} Headlines</h2>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage && /^https?:\/\//.test(element.urlToImage) ? element.urlToImage : "https://tce.exchange/_next/image?url=https%3A%2F%2Fstatic.tce.exchange%2Fassets%2Fsources%2F10a8ef05-7a1b-4372-88cb-75a8d40dbf27%2Bnewsmonkey.png&w=1536&q=75"}
                    newsUrl={element.url}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark"
              onClick={this.handlePrevpage}
            >
              &larr; Prev
            </button>
            <button
              type="button"
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              className="btn btn-dark"
              onClick={this.handleNextpage}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
