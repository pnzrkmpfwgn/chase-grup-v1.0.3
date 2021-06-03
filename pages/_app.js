import App from 'next/app';
import {Provider} from '../context'
import '../styles/globals.css';
import Layout from '../components/layout';

class MyApp extends App {
  render(){
    const {Component, pageProps} = this.props;
    return(
      <Provider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default MyApp
