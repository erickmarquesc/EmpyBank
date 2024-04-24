import { ContainerGrid } from "@/Components/ContainersAndContent/styles";
import Modal from "@/Components/Modal";
import Sidebar from "@/Components/Sidebar";
import { ModalContextProvider } from "@/Context/ModalContext";
import { AssistantContextProvider } from "@/Context/AssistantContext";
import { queryClient } from "@/lib/react-query";
import { GlobalStyle } from "@/styles/globals";
import { defaultTheme } from "@/styles/theme/default";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { CustomerContextProvider } from "@/Context/CustomerContext";

interface IProvidersProps {
  children: ReactNode,
}

export default function EmpyBankProviders({ children }: IProvidersProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ModalContextProvider>
        <QueryClientProvider client={queryClient}>
          <AssistantContextProvider>
            <CustomerContextProvider>
              <GlobalStyle />
              <Modal />
              <ContainerGrid>
                <Sidebar />
                {children}
              </ContainerGrid>
            </CustomerContextProvider>
          </AssistantContextProvider>
        </QueryClientProvider>
      </ModalContextProvider>
    </ThemeProvider>
  )
}