import { useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import ArticleTile from '../components/Article/ArticleTile/ArticleTile';
import request from '../lib/datocms';
import Context from '../src/context/context';

const ALL_ARTICLES_QUERY = gql`
{
  allArticles {
    id
    title
    shortDescription
    slug
    thumbnail{
      url
      title
      height
    }
    rate
    createdAt
    tags{
      description,
      title,
    }
  }
}`;

const Home = ({ data }) => {
  const { updateArticles } = useContext(Context);
  const { allArticles } = data;
  const articleIds = allArticles.map((article) => article.id);
  useEffect(() => {
    const query = {
      articles: articleIds,
    };
    axios.post(`${process.env.NEXT_PUBLIC_FETCH_LIKES_URL}/articles`, query)
      .then((response) => {
        updateArticles(response.data);
      })
      .catch((response) => {
        console.log('Error occurred during social-likes data fetching.', response);
      });
  }, []);
  const articlesToRender = allArticles.map((article) => (
    <ArticleTile
      key={article.id}
      id={article.id}
      title={article.title}
      shortDescription={article.shortDescription}
      slug={article.slug}
      thumbnail={article.thumbnail[0]}
      rate={article.rate}
      createdAt={article.createdAt.substring(0, article.createdAt.indexOf('T'))}
    />
  ));
  return (
    <Layout>
      {articlesToRender}
    </Layout>
  );
};
Home.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
};
export default Home;

export async function getStaticProps() {
  const response = await request({
    query: ALL_ARTICLES_QUERY,
  });
  return {
    props: {
      data: response.data,
    },
  };
}
