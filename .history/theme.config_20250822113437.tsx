import React from 'react'

const config = {
  logo: <span>My Docs</span>,
  project: {
    link: 'https://github.com/your-username/your-repo',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/your-username/your-repo',
  footer: {
    text: 'My Documentation Site',
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
