import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import imgLogo from '@/assets/logo/logo.svg'

import { InProgressContainer } from './styles'

export default function InProgress() {
  return (
    <>
      <NextSeo
        title='Empy'
        description='Soluções financeiras criativas e inteligentes.'
      />
      
      <InProgressContainer>
        <Image
          alt=""
          src={imgLogo}
          height={200} /* Altura máxima que a imagem vai esticar */
          quality={100} /* Por padrão o next reduz a qualidade para 80% então voltei para 100% */
          priority /* Assim terá prioridade no carregamento não sendo o ultimo elemento a carregar */
        />
        <h1>&#x1F6A7; Página em construção &#x1F6A7;</h1>
        <h2>Estamos trabalhando nessa página.</h2>
        <h3>Enquanto isso de uma olhada na&nbsp;
          <Link href='/'>
            carteira de clientes
          </Link>
        </h3>
      </InProgressContainer>
    </>
  )
}