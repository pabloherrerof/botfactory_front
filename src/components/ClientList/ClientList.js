"use client";
import styled from "styled-components";
import  { AddButton, CardButton } from "../Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { AddEditClient } from "../AddClient/AddEditClient";
import Pagination from "../Pagination/Pagination";
import { containerVariants, itemVariants, modalVariants, style } from "./animation";
import { FaUserAltSlash } from "react-icons/fa";
import { calcularEdad, scrollToTop } from "@/util/util";
import { Modal } from "../Modal/Modal";
import { motion } from "framer-motion";
import { useCategoriesStore } from "@/store/store";



export const ClientList = ({ data, setShowIntro }) => {
  const [addClient, setAddClient] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState(null);
  const getCategoryName = useCategoriesStore((state) => state.getCategoryName);
  const categories = useCategoriesStore((state) => state.categories);

  const onEditClickHandler = (client) => {
    scrollToTop();
    setEditClient(client);
    setShowIntro(false);
  }

  const onDeleteClickHandler = (id) => {
    setShowModal(true);
    setClientId(id)
  }

  const onAddClickHandler = () => {
    scrollToTop();
    setAddClient(true);
    setShowIntro(false);
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      style={{ marginTop: "40px" }}
    >
      {(!addClient && !editClient) && (

        <motion.div variants={itemVariants} style={style}>
          <AddButton onClick={onAddClickHandler}>
            <IoMdAddCircleOutline />
            Add Client
          </AddButton>
        </motion.div>
      )}
  
      {!addClient && !editClient && categories ? (
            <>
          {data.length !== 0 ? (
            <ClientListContainer>
           { data.map((client) => (
              <motion.div variants={itemVariants} key={client.id}>
                <ClientListItem>
                  <ClientListItemContainer>
                    <ClientPhotoContainer>
                      <ClientPhoto src={client.photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${client.photo}` : "/user.jpg"} />
                      <ClientStatus active={client.active}>
                        {client.active === 1 ? "Active" : "Inactive"}
                      </ClientStatus>
                    </ClientPhotoContainer>
                    <ClientListDetails>
                      <h5>{client.name + " " + client.surname }</h5>
                      <p><strong>Email: </strong>{client.email}</p>
                      <p><strong>Population: </strong>{client.population}</p>
                      <p><strong>Birthday: </strong>{new Date(client.birthday).toISOString().split("T")[0]}</p>
                      <p><strong>Age: </strong>{ calcularEdad(new Date(client.birthday).toISOString().split("T")[0])}</p>
                      <p><strong>Category: </strong>{getCategoryName(client.category_id)}</p>
                      <p><strong>Created: </strong>{new Date(client.created_at).toISOString().split("T")[0]}</p>
                      <p><strong>Last update: </strong>{new Date(client.updated_at).toISOString().split("T")[0]}</p>
                    </ClientListDetails>
                  </ClientListItemContainer>
                  <ButtonsContainer>
                    <CardButton onClick={() => onEditClickHandler(client)}>
                      <FaEdit className="icon" />
                    </CardButton>
                    <CardButton color="#da5649"
                      onClick={() => onDeleteClickHandler(client.id)}>
                      <MdDelete className="icon" />
                    </CardButton>
                  </ButtonsContainer>
                </ClientListItem>
              </motion.div>
            ))}
            <Pagination />
            </ClientListContainer>
          ) : (
            <ClientListContainer>
              <motion.div variants={itemVariants}>
                <ClientListItem>
                  <FaUserAltSlash />
                  <h3>No clients found</h3>
                </ClientListItem>
              </motion.div>
            </ClientListContainer>
          )}
        </>
      ) : (
        <ClientListContainer>
          <motion.div variants={modalVariants}>
            <AddEditClient setAddClient={setAddClient} client={editClient} setEditClient={setEditClient} setShowIntro={setShowIntro} />
          </motion.div>
        </ClientListContainer>
      )}
      {showModal && (
        <Modal setShowModal={setShowModal} clientId={clientId}/>)}
    </motion.div>
  )
};
  

const ClientListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;
  margin-bottom: 30px;
`;

export const ClientListItem = styled.li`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 100%;
  width: 500px;
  height: ${(props) => (props.big ? "auto" : "400px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  padding: 2.5rem 2.5rem;
  padding-top: 3rem;
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  }

  svg {
    color: #e74c3c;
    font-size: 100px;
    margin-bottom: 1rem;
  }
  @media (max-width: 570px) {
    width: 300px;
    height: 100%;
  }
`;

export const ClientListItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.big ? "column" : "row")};
  justify-content: flex-start;
  gap: 1rem;
  height: 100%;
  width: 100%;


  @media (max-width: 570px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.delete ? "center" : "flex-end")};
  gap: 1rem;
  max-width: ${(props) => (props.big ? "300px" : "auto")};

  @media (max-width: 570px) {
    margin-top: 1rem;
    justify-content: center;
  }
`;
export const ClientPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const ClientListDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: ${(props) => (props.big ? "0" : "1rem")};
  height: 100%;
  gap: 0.5rem;
  width: ${(props) => (props.big ? "300px" : "auto")};
  margin-bottom: ${(props) => (props.big ? "1rem" : "0")};
  text-align: start;

  h5 {
    font-size: 22px;
    color: #333;
    margin-bottom: 0;
  }

  p {
    font-size: 13px;
    color: #333;
    margin-bottom: 0;
  }

  @media (max-width: 570px) {
    width: 250px;
  }
`;

const ClientStatus = styled.div`
  width: 60px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#53b353" : "#da5649")};
  font-size: 10px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClientPhotoContainer = styled.div`
  width: ${props => props.big ? "300px" : "150px"};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 570px) {
    width: 250px;
  }
`;

export const ClientForm = styled.form`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 100%;
  width: 500px;
  height: ${(props) => (props.big ? "auto" : "400px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  padding: 2.5rem 2.5rem;
  padding-top: 3rem;
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  }

  svg {
    color: lightblue;
    font-size: 150px;
  }
  @media (max-width: 570px) {
    width: 300px;
    height: 100%;
  }
`;
