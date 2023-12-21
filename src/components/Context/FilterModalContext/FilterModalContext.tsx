import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
    children: ReactNode;
}

type ModalContextValue ={
    showModal: boolean;
    openModal: () => void;
    closeModal: () => void;

}
const contextInitialValue: ModalContextValue = {
    showModal:true,
    openModal: () => {},
    closeModal: () => {},
};

const ModalContext = createContext<ModalContextValue>(contextInitialValue);

const ModalProvider = ({ children }:ModalContextProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

    };


    const contextValue: ModalContextValue = {
        showModal,
        openModal,
        closeModal,


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
