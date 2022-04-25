import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal"
import { useState } from "react";
import { NewTrasactionsModal } from "./NewTransactionModal";
import { TransactionsProvider } from "./TransactionsContext";


Modal.setAppElement("#root");

export function App() {

  const [isNewTransactionsModalOpen,setIsNewTransactionsModalOpen ] = useState(false);

  function handleOpenNewTransactionModal(){
      setIsNewTransactionsModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionsModalOpen(false);
  }
  
      return (
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

        <Dashboard/>

        <NewTrasactionsModal 
          isOpen={isNewTransactionsModalOpen} 
          onRequestClose={handleCloseNewTransactionModal}/>

        <GlobalStyle />
      </TransactionsProvider>
  );
}