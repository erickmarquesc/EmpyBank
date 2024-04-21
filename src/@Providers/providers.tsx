import { ContainerGrid } from "@/Components/ContainersAndContent/styles";
import Modal from "@/Components/Modal";
import Sidebar from "@/Components/Sidebar";
import { ModalContextProvider } from "@/Context";
import { GlobalStyle } from "@/styles/globals";
import { defaultTheme } from "@/styles/theme/default";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface IProvidersProps {
  children: ReactNode,
}

export default function EmpyBankProviders({ children }: IProvidersProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ModalContextProvider>
        <GlobalStyle />
        <Modal />
        <ContainerGrid>
          <Sidebar />
          {children}
        </ContainerGrid>
      </ModalContextProvider>
    </ThemeProvider>
  )
}