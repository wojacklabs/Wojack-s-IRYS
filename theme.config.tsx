import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Wojack's IRYS</span>,
  footer: {
    text: 'End',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – My Docs'
    }
  },
  primaryHue: 200,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="My Docs" />
      <meta property="og:description" content="Documentation site" />
    </>
  ),
}

export default config
