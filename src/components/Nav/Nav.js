import styled from "styled-components";
import { Logo } from "../Logo/Logo";
import { CgLogOut } from "react-icons/cg";
import { redirect } from "next/dist/server/api-utils";
import { useAuth } from "@/hooks/auth";
import { IoMdAddCircleOutline } from "react-icons/io";
import { color } from "framer-motion";

export const Nav = () => {
    const { logout } = useAuth({ middleware: 'auth', redirectIfNotAuthenticated: '/'})
    return (
        <NavContainer>
            <NavItem>
            </NavItem>
            <Logo size={60}/>
            <NavItem  color="#e74c3c" onClick={() => logout() }>
                <CgLogOut/>
            </NavItem>
        </NavContainer>
    );
    }

const NavContainer = styled.nav`
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
    height: 120px;
    position: fixed;
    top: 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    z-index: 1000;

    h4{
        margin-top: 5px;
    }
`;

export const NavItem = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.color ? props.color : 'transparent'};
    border-radius: 50%;

    svg{
        font-size: 20px;
        color: white;
        cursor: pointer;
    }
    p{
        font-size: 9px;
    }

    &:hover{
        scale: 1.1;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
        transition: 0.3s;
    }
    `