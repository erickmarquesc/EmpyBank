import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { ReactNode } from "react"

import Sidebar from "@/Components/Sidebar"
import Modal from "@/Components/Modal"

import { Container, Content } from "@/Components/ContainersAndContents/styles"
import { AssistantContextProvider } from "@/Context/AssistantContext"
import { CustomerContextProvider } from "@/Context/CustomerContext"
import { ModalContextProvider } from "@/Context/ModalContext"

import { defaultTheme } from "@/styles/theme/default"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "@/styles/globals"

interface IProvidersProps {
  children: ReactNode,
}

export default function EmpyBankProviders({ children }: IProvidersProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <AssistantContextProvider>
            <CustomerContextProvider>
              <GlobalStyle />
              <Modal />
              <Container>
                <Sidebar />
                <Content>
                  {children}
                </Content>
              </Container>
            </CustomerContextProvider>
          </AssistantContextProvider>
        </ModalContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}