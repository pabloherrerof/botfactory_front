import { IoMdContact } from "react-icons/io";
import {
  ClientListDetails,
  ClientListItemContainer,
  ButtonsContainer,
  ClientPhotoContainer,
  ClientPhoto,
  ClientForm,
} from "../ClientList/ClientList";
import Input, { FileInput, InputContainer, Select } from "../Form/Input";
import Label from "../Form/Label";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "@/lib/notifications";
import axios from "@/lib/axios";
import { useCategoriesStore, useClientsStore, useParamsStore } from "@/store/store";
import { toast } from "react-toastify";

export const AddEditClient = ({
  setAddClient,
  client,
  setEditClient,
  setShowIntro,
}) => {
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    population: "",
    category_id: 1,
    birthday: "",
    active: 1,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const resetFilters = useParamsStore((state) => state.resetFilters);
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const editClient = useClientsStore((state) => state.editClient);
  const createClient = useClientsStore((state) => state.createClient);



  useEffect(() => {
    if (client) {
      setClientData({
        name: client.name,
        email: client.email,
        population: client.population,
        category_id: client.category_id,
        birthday: client.birthday,
        active: client.active,
      });
    }
  }, [client]);



  useEffect(() => {
if(categories.length === 0)
      fetchCategories();
  }, [categories]);

  const onCreateSubmit = () => {
    return async (e) => {
      e.preventDefault();
      try{
        const response = await createClient(clientData)
        if(response.ok) {
          setShowIntro(true);
          setEditClient(false);
          resetFilters();
        }
      } catch (error) {
        setError("We could not find information. Try again later.");
      }
    };
  };

  const onEditSubmit = () => {
    return async (e) => {
      e.preventDefault();
      try{
        const response = await editClient(client)
        if(response) {
          setShowIntro(true);
          setEditClient(false);
          resetFilters();
        }
      } catch (error) {
        setError("We could not find information. Try again later.");
      }
  };
};

  const handleInputChange = (field, value) => {
    if (client) setEditClient((prev) => ({ ...prev, [field]: value }));
    setClientData((prev) => ({ ...prev, [field]: value }));
      if(field === 'photo') {
        let reader = new FileReader();
        let file = value;
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
      }
  }



   

  return (<>
    {client ? <h2>Edit Client</h2> : <h2>Add Client</h2>}
    <ClientForm big onSubmit={client ? onEditSubmit() : onCreateSubmit()}>
      <ClientListItemContainer big>
        <ClientPhotoContainer big>
        <ClientPhoto src={imagePreviewUrl ? imagePreviewUrl : client.photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${client.photo}` : "/user.jpg"}  />
          <InputContainer>
            <Label>Photo</Label>
            <FileInput
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleInputChange("photo", e.target.files[0])}
            />
          </InputContainer>
        </ClientPhotoContainer>
      </ClientListItemContainer>
      <ClientListDetails big>
        <InputContainer>
          <Label>Name</Label>
          <Input
            type="text"
            value={client ? client.name : clientData.name}
            required
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Surname</Label>
          <Input
            type="text"
            value={client ? client.surname : client.surname}
            required
            onChange={(e) => handleInputChange("surname", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <Input
            type="email"
            value={client ? client.email : client.email}
            required
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Birthdate</Label>
          <Input
            type="date"
            value={
              client
                ? new Date(client.birthday).toISOString().split("T")[0]
                : clientData.birthday
            }
            required
            onChange={(e) => handleInputChange("birthday", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Population</Label>
          <Input
            type="text"
            value={client ? client.population : client.population}
            required
            onChange={(e) => handleInputChange("population", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Category</Label>
          <Select
            required
            defaultValue={client ? client.category_id : 1}
            value={client ? client.category_id : clientData.category_id}
            onChange={(e) => handleInputChange("category_id", e.target.value)}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Status</Label>
          <Select
            value={client ? client.active : clientData.active}
            onChange={(e) => handleInputChange("active", e.target.value)}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </Select>
        </InputContainer>
      </ClientListDetails>
      <ButtonsContainer big>
        <Button
          color={"#da5649"}
          onClick={() => {
            setAddClient(false);
            setEditClient(false);
            setShowIntro(true);
            resetFilters();
          }}
        >
          Cancel
        </Button>
        <Button>Add</Button>
      </ButtonsContainer>
    </ClientForm>
    </>
  );
};
