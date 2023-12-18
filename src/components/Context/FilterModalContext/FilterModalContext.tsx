import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
    children: ReactNode;
}

type ModalContextValue ={
    showModal: boolean;
    url:string;
    openModal: () => void;
    closeModal: () => void;
    setSearchUrl: (u:string) => void;
}
const contextInitialValue: ModalContextValue = {
    showModal:true,
    url:'',
    openModal: () => {},
    closeModal: () => {},
    setSearchUrl: () => {},
};

const ModalContext = createContext<ModalContextValue>(contextInitialValue);

const ModalProvider = ({ children }:ModalContextProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

    };
    const setSearchUrl = (u:string) => {
      setUrl(u)
    }

    const contextValue: ModalContextValue = {
        showModal,
        url,
        openModal,
        closeModal,
        setSearchUrl,

    };

    return (
        <ModalContext.Provider value={contextValue} >
            {children}
        </ModalContext.Provider>
    );
};

const useModal = (): ModalContextValue => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export { ModalProvider, useModal };
