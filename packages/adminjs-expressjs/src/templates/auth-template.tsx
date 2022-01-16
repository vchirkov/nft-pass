/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineStyles } from '@adminjs/design-system'
import i18n from 'i18next'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import AdminJS, {
    getAssets,
    getBranding,
    getFaviconFromBranding,
    initializeAssets,
    initializeBranding,
    initializeLocale,
    createStore,
    ReduxState,
    ViewHelpers
} from 'adminjs'

import {Auth} from './components/Auth';

type LoginTemplateAttributes = {
    /**
     * action which should be called when user clicks submit button
     */
    action: string;

    link: string;
    /**
     * Error message to present in the form
     */
    errorMessage?: string;
}

export type ViewProps = {
    message?: string;
    action: string;
    link: string;
};

const html = async (
    admin: AdminJS,
    type: 'login' | 'register',
    { action, link, errorMessage }: LoginTemplateAttributes
): Promise<string> => {
    const h = new ViewHelpers({ options: admin.options })

    const store: Store<ReduxState> = createStore()

    const branding = await getBranding(admin)
    const assets = await getAssets(admin)
    const faviconTag = getFaviconFromBranding(branding)

    const scripts = ((assets && assets.scripts) || [])
        .map(s => `<script src="${s}"></script>`)
    const styles = ((assets && assets.styles) || [])
        .map(l => `<link rel="stylesheet" type="text/css" href="${l}">`)

    store.dispatch(initializeBranding(branding))
    store.dispatch(initializeAssets(assets))
    store.dispatch(initializeLocale(admin.locale))

    const theme = combineStyles((branding && branding.theme) || {})
    const { locale } = store.getState()
    await i18n.init({
        resources: {
            [locale.language]: {
                translation: locale.translations
            }
        },
        lng: locale.language,
        interpolation: { escapeValue: false }
    })

    const sheet = new ServerStyleSheet()

    const authComponent = renderToString(
        <StyleSheetManager sheet={sheet.instance}>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider theme={theme}>
                        <Auth type={type} action={action} link={link} message={errorMessage}/>
                    </ThemeProvider>
                </I18nextProvider>
            </Provider>
        </StyleSheetManager>
    )
    sheet.collectStyles(<Auth type={type} action={action} link={link} message={errorMessage}/>)
    const style = sheet.getStyleTags()
    sheet.seal()

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">
      ${styles.join('\n')}

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${authComponent}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}

export default html
