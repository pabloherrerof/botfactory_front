import { IoMdContact } from "react-icons/io";
import {
  ClientListItem,
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

export const AddEditClient = ({
  setAddClient,
  client,
  setEditClient,
  setShowIntro,
}) => {
  const [categories, setCategories] = useState([]);
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

  const onCreateSubmit = () => {
    return async (e) => {
      e.preventDefault();
      try {
        console.log(clientData);
        axios.defaults.withCredentials = true;
        await axios.post(`/api/clients`, clientData);
        toastSuccess("Client added successfully.");
        setAddClient(false);
        setShowIntro(true);
      } catch (error) {
        setError("We could not find information. Try again later.");
        toastError(error.response.data.message)
        
      }
    };
  };

  const onEditSubmit = () => {
    return async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", client.name);
      formData.append("surname", client.surname);
      formData.append("email", client.email);
      formData.append("population", client.population);
      formData.append("category_id", client.category_id);
      formData.append("birthday", client.birthday);
      formData.append("active", client.active);
      formData.append("photo", client.photo);
      formData.append('_method', 'PUT')
      try {
        axios.defaults.withCredentials = true;
        await axios.post(`/api/clients/${client.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toastSuccess("Client updated successfully.");
        setEditClient(false);
        setShowIntro(true);
      } catch (error) {
        setError("We could not find information. Try again later.");
        toastError("Server error. Try again later.");
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
