"use client";
import Button from "@/components/Button/Button";
import Input, { InputContainer } from "@/components/Form/Input";
import Label from "@/components/Form/Label";
import { Main } from "@/components/Layout/Layout";
import {
  ForgotPassword,
  FormInfoContainer,
  LoginButtonContainer,
  LoginContainer,
  LoginForm,
} from "@/components/Login/Login";
import { LogoContainer } from "@/components/Logo/Logo";
import { useAuth } from "@/hooks/auth";
import { toastError } from "@/lib/notifications";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidMessageDots } from "react-icons/bi";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const searchParams = useSearchParams();
  const reset = searchParams.get("reset");

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset));
    } else {
      setStatus(null);
    }
    if (reset) {
      toastSuccess("Contraseña cambiada con éxito");
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors: (errors) => {
        setErrors(errors);
        if (errors && Object.keys(errors).length > 0) {
          if (errors.email) {
            toastError(errors.email[0]);
          }
          if (errors.password) {
            toastError(errors.password[0]);
          }
        }
      },
      setStatus,
    });
  };

  return (
    <Main>
      <LoginContainer>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 230,
            damping: 40,
          }}
        >
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
          <LoginForm>
            
              <LogoContainer>
                <BiSolidMessageDots />
              </LogoContainer>
              <FormInfoContainer onSubmit={submitForm}>
                <h2>Bot Factory Dashboard</h2>
                <motion.div variants={itemVariants}>
                  <InputContainer>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required autoFocus />
                  </InputContainer>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <InputContainer>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required autoFocus />
                  </InputContainer>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <LoginButtonContainer>
                    <ForgotPassword>
                      <p>Forgot password?</p>
                      <Link href="/forgot-password" className="underline">
                                Click here
                      </Link>
                    </ForgotPassword>
                    <Button>Login</Button>
                  </LoginButtonContainer>
                </motion.div>
              </FormInfoContainer>
          </LoginForm>
          </motion.div>
        </motion.div>
      </LoginContainer>
    </Main>
  );
};

export default Page;
