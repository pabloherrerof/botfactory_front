import { IoMdContact } from "react-icons/io";
import {
  ClientListItem,
  ClientListDetails,
  ClientListItemContainer,
  ButtonsContainer,
  ClientPhotoContainer,
} from "../ClientList/ClientList";
import Input, { FileInput, InputContainer, Select } from "../Form/Input";
import Label from "../Form/Label";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { toastError } from "@/lib/notifications";
import axios from "@/lib/axios";

export const AddEditClient = ({ setAddClient, client, setEditClient }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    population: "",
    category: "",
    active: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`/api/categories`);
        setCategories(response.data);
      } catch (error) {
        setError("We could not find information. Try again later.");
        toastError("Server error. Try again later.");
      } finally {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(client){
      setClientData({
        id: client.id,
        name: client.name,
        email: client.email,
        population: client.population,
        category: client.category,
        active: client.active,
      });
    }} , [client]);

  console.log(categories);
  return (
    <ClientListItem big>
      <ClientListItemContainer big>
        <ClientPhotoContainer big>
          <IoMdContact />
          <InputContainer>
            <Label>Photo</Label>
            <FileInput type="file" />
          </InputContainer>
        </ClientPhotoContainer>
      </ClientListItemContainer>
      <ClientListDetails big>
        <InputContainer>
          <Label>Name</Label>
          <Input type="text" value={client ? client.name : ""} />
        </InputContainer>
        <InputContainer>
          <Label>Surname</Label>
          <Input type="text" value={client ? client.surname : ""} />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <Input type="email" value={client ? client.email : ""} />
        </InputContainer>
        <InputContainer>
          <Label>Population</Label>
          <Input type="text" value={client ? client.population : ""} />
        </InputContainer>
        <InputContainer>
          <Label>Category</Label>
          <Select
          value={client ? client.category : ""}
          >
   {         categories &&
              categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}  
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Status</Label>
          <Select value={client ? client.active : ""} onChange={(e) => setClientData(...client, e.target.value) }>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </Select>
        </InputContainer>
      </ClientListDetails>
      <ButtonsContainer big>
        <Button color={"#da5649"} onClick={() => {
          setAddClient(false)
          setEditClient(false)}}>
          Cancel
        </Button>
        <Button>Add</Button>
      </ButtonsContainer>
    </ClientListItem>
  );
};
