import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import SplashScreen from '@/components/SplashScreen/SplashScreen'

export const metadata: Metadata = {
  title: 'Niyas Mohammed | Full-Stack Developer',
  description:
    'Portfolio of Niyas Mohammed — a passionate Full-Stack Developer crafting beautiful, performant web applications.',
  keywords: ['Niyas Mohammed', 'Full-Stack Developer', 'React', 'Next.js', 'Portfolio'],
  openGraph: {
    title: 'Niyas Mohammed | Full-Stack Developer',
    description: 'Full-Stack Developer crafting beautiful web applications.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <SplashScreen />
          <div id="app-root">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}