import styled from "styled-components";
import { ButtonsContainer } from "../ClientList/ClientList";
import { DeleteButton } from "../Button/Button";
import { useClientsStore, useParamsStore } from "@/store/store";

export const Modal = ({ setShowModal, clientId}) => {
    const deleteClient = useClientsStore((state) => state.deleteClient);
    const resetFilters = useParamsStore((state) => state.resetFilters);

    const onDeleteCLickHandler = async (e) => {
            e.preventDefault();
            try{
              const response = await deleteClient(clientId);
              if(response.ok) {
                setShowModal(false);
                resetFilters();
              }
            } catch (error) {
                throw error;
            }
    }

    const onCancelClickHandler = () => {
        setShowModal(false);
    }

  return (
    <ModalBackground>
      <ModalContainer>
        <h5>Are you sure you want to delete this user?</h5>
        <ButtonsContainer delete>
          <DeleteButton onClick={onCancelClickHandler}>Cancel</DeleteButton>
          <DeleteButton onClick={onDeleteCLickHandler} color="#da5649">Delete</DeleteButton>
        </ButtonsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px) brightness(0.8);
  -webkit-backdrop-filter: blur(2px) brightness(0.8);
`;

export const ModalContainer = styled.div`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 100%;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  padding: 2.5rem 2.5rem;
  padding-top: 3rem;
  transition: 0.3s;

  h5 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
    @media (max-width: 570px) {
      font-size: 1.25rem;
    }
  }
`;
