"use client";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TitleContainer } from "../Layout/Layout";
import Button, { AddButton, CardButton } from "../Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { InputContainer } from "../Form/Input";
import Label from "../Form/Label";
import { AddEditClient } from "../AddClient/AddEditClient";

const style = {
  maxWidth: "1200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "70",
  flexWrap: "wrap",
  textAlign: "center",
  marginTop: "40px",
};

const modalVariants = {
  hidden: { opacity: 0, y: 1000 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 40,
      delay: 0,
    },
  },
  exit: {
    opacity: 0,
    y: 1000,
    transition: { duration: 0.5 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 2,
      delayChildren: 3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.5 },
  },
};
const itemVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5 },
  },
};

export const ClientList = ({ data }) => {
  const [addClient, setAddClient] = useState(false);
  const [editClient, setEditClient] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {(!addClient || !editClient) && (
            <motion.div variants={itemVariants} style={style}>
        <AddButton onClick={() => setAddClient(true)}>
          <IoMdAddCircleOutline />
          Add Client
        </AddButton>
      </motion.div>)
      }
      <ClientListContainer>
        {!addClient && !editClient ? (<>
      

      {    data.map((client) => (
            <motion.div variants={itemVariants} key={client.id}>
              <ClientListItem>
                <ClientListItemContainer>
                  <ClientPhotoContainer>
                    {!client.photo ? (
                      <>
                        <IoMdContact />
                      </>
                    ) : (
                      <>
                        <ClientPhoto src={client.photo} />
                      </>
                    )}
                    <ClientStatus active={client.active}>
                      {client.active === 1 ? "Active" : "Inactive"}
                    </ClientStatus>
                  </ClientPhotoContainer>
                  <ClientListDetails>
                    <h5>{client.name}</h5>
                    <p>
                      <strong>Email: </strong>
                      {client.email}
                    </p>
                    <p>
                      <strong>Population: </strong>
                      {client.population}
                    </p>
                    <p>
                      <strong>Category: </strong>
                      {client.category}
                    </p>
                    <p>
                      <strong>Created: </strong>
                      {new Date(client.created_at).toISOString().split("T")[0]}
                    </p>
                    <p>
                      <strong>Last update: </strong>
                      {new Date(client.updated_at).toISOString().split("T")[0]}
                    </p>
                  </ClientListDetails>
                </ClientListItemContainer>
                <ButtonsContainer>
                  <CardButton color="">
                    <FaEdit className="icon" onClick={() => setEditClient(client.id)}/>
                  </CardButton>
                  <CardButton color="#da5649">
                    <MdDelete className="icon" />
                  </CardButton>
                </ButtonsContainer>
              </ClientListItem>
            </motion.div>
          ))}
          </>
        ) : (
          <motion.div variants={modalVariants}>
            <AddEditClient setAddClient={setAddClient} client={editClient} setEditClient={setEditClient}>
            </AddEditClient>
          </motion.div>
        )}
      </ClientListContainer>
    </motion.div>
  );
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
  margin-top: ${(props) => (props.big ? "0" : "1rem")};
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
  justify-content: flex-end;
  gap: 1rem;

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
`;