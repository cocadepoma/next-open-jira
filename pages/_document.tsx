import Document, { DocumentContext, Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document'
import { resetServerContext } from 'react-beautiful-dnd'

class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initalProps = await Document.getInitialProps(ctx)
  //   return initalProps
  // }
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    resetServerContext()
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="shorcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;