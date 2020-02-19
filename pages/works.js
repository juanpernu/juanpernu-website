import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav';

const Works = () => (
  <div>
    <Head>
      <title>Juan Pernumian | Works</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Nav />
    <div className='hero'>
      <h1 className='title'>Works</h1>
      <div className='row'>
        <Link href='/blog/index' as='/blog'>
          <a className='card'>
            <h3>Blog &rarr;</h3>
            <p>Here is where I feel free to write.</p>
          </a>
        </Link>
      </div>
      <footer>Copyright - Juan Manuel Pernumian®</footer>
    </div>

    <style jsx>{`
      * {
        font-size: 16px;    
      }
      footer {
        font-size: 0.8em;
        position: fixed;
        bottom: 0;
        margin: 0;
        padding-bottom: 20px;
        color: #ddd;
      }
      code {
        color: #ff3860;
        font-size: .875em;
        font-weight: 400;
        padding: .15em .3em;
        background-color: #f5f5f5;
        font-size: 1em;
        border-radius: 5px;
      }
      .hero {
        width: 100%;
        padding: 100px 20px 0;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        line-height: 1.6;
        font-size: 2.441em;
      }
      .description {
        font-size: 1em;
        width: 490px;
        line-height: 1.6;
        color: #555;
      }
      .row {
        margin-top: 80px;
        display: flex;
        flex-direction: row;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
        margin-right: 20px;
      }
      .card:last-child {
        margin-right: 0;
      }
      .card:hover {
        border-color: #00ff8b;
      }
      .card h3 {
        margin: 0;
        color: #00ff8b;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }

      @media only screen and (max-width: 800px) {
        .hero {
          display: flex;
          flex-direction: column;
          padding: 50px 20px 0;
          width: auto;
        }
        .title {
          font-size: 1.953em;
        }
        .description {
          font-size: 1em;
          width: auto;
          line-height: 1.6;
          color: #555;
        }
        .row {
          flex-direction: column;
        }
        .card {
          margin: 0 0 20px;
        }
      }
    `}</style>
  </div>
)

export default Works;
