import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
// import reload from 'reload';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { CssBaseline } from '@material-ui/core';
import {
    MuiThemeProvider,
    createGenerateClassName
} from '@material-ui/core/styles';
import AppRouter from './routers/AppRouter';
import theme from './theme';

const app = express();

const PORT = process.env.PORT || 3000;
// const dev = process.env.NODE_ENV === 'development';
const path = require('path');

app.use(express.static('public'));

// if (dev) {
//     reload(app);
// }
app.use((req, res) => {
    const statsFile = path.resolve('public/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile });

    const sheetsRegistry = new SheetsRegistry();

    const generateClassName = createGenerateClassName();

    const sheetsManager = new Map();

    const jsx = extractor.collectChunks(
        <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
        >
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <CssBaseline />
                <ChunkExtractorManager extractor={extractor}>
                    <AppRouter />
                </ChunkExtractorManager>
            </MuiThemeProvider>
        </JssProvider>
    );

    const html = renderToString(jsx);
    const scriptTags = extractor.getScriptTags();
    const css = sheetsRegistry.toString();

    res.send(`
    <!DOCTYPE html>
        <html lang='en'>
            <head>
                <meta charset='utf-8' />
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
                <meta
                    name='description'
                    content='Web application from saving and managing working hours'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Courgette&display=swap'
                    rel='stylesheet'
                />

                <!--
            manifest.json provides metadata used when your web app is installed on a
            user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
            -->
                <!-- <link rel='manifest' href='%PUBLIC_URL%/manifest.json' /> -->
                <title>My Working Time</title>
                <style id='jss-styles'>${css}</style>
            </head>

            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id='root'>${html}</div>
                
                ${scriptTags}
            </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

// ${ dev ? `<script src='/reload/reload.js' async></script>` : `` }
