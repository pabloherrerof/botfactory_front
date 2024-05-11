import styled from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useParamsStore } from "@/store/store";

export const SearchBar = () => {
    const params = useParamsStore((state) => state.params);
    const buildUrl = useParamsStore((state) => state.buildUrl);
    const setSearch = useParamsStore((state) => state.setParams);
    
    return (
        <SearchBarContainer>
            <SearchBarInputContainer>
            <SearchBarInput type="text" placeholder="Search..." onChange={(event) => {
                setSearch("search", event.target.value);
                setSearch("current_page", 0);
                const url = buildUrl(params);
            }}/>
            <FaMagnifyingGlass />
            </SearchBarInputContainer>
        </SearchBarContainer>
    );
    }

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
`
const SearchBarInputContainer = styled.div`
    width: 100%;
    min-width: 300px;
    height: 40px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    background-color: white;
    position: relative;

    svg{
        position: absolute;
        right: 10px;
        top: 12px;
        color: #333;
    
    }

    
`

const SearchBarInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 5px 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    color: #333;

    &:focus {
    border-color: #4f46e5; 
    outline: none; 
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5); 
  }
`