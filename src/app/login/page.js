"use client";
import { Main } from "@/components/Layout/Layout";
import { LoginContainer, LoginForm } from "@/components/Login/Login";
import { motion } from "framer-motion"
import { BiSolidMessageDots } from "react-icons/bi";

const Page = () => {
  return (
    <Main>
      <LoginContainer>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 40,
            delay: 1
          }}
        >
          <LoginForm>
            <BiSolidMessageDots/>
          </LoginForm>
        </motion.div>
      </LoginContainer>
    </Main>
  );
};

export default Page;
