import { IoMdContact } from "react-icons/io";
import {
  ClientListItem,
  ClientListDetails,
  ClientListItemContainer,
  ButtonsContainer,
  ClientPhotoContainer,
} from "../ClientList/ClientList";
import Input, { FileInput, InputContainer } from "../Form/Input";
import Label from "../Form/Label";
import Button from "../Button/Button";

export const AddEditClient = ({ setAddClient, client, setEditClient }) => {
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
          <Input type="text" />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <Input type="email" />
        </InputContainer>
        <InputContainer>
          <Label>Population</Label>
          <Input type="tel" />
        </InputContainer>
        <InputContainer>
          <Label>Active</Label>
          <Input type="checkbox" />
        </InputContainer>
      </ClientListDetails>
      <ButtonsContainer>
        <Button onClick={() => setAddClient(false)}>Cancel</Button>
        <Button>Add</Button>
      </ButtonsContainer>
    </ClientListItem>
  );
};
