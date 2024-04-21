import EmpyBankProviders from '@/@Providers/providers'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EmpyBankProviders>
      <Component {...pageProps} />
    </EmpyBankProviders>
  )
}