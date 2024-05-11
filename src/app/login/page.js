"use client";
import Button from "@/components/Button/Button";
import { Checkbox, CheckboxContainer } from "@/components/Form/Checkbox";
import Input, { InputContainer } from "@/components/Form/Input";
import Label from "@/components/Form/Label";
import { Main } from "@/components/Layout/Layout";
import {
  FormInfoContainer,
  LoginButtonContainer,
  LoginContainer,
  LoginForm,
} from "@/components/Login/Login";
import { Logo } from "@/components/Logo/Logo";
import { useAuth } from "@/hooks/auth";
import { toastError } from "@/lib/notifications";
import { useAnimationStore } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { containerVariants, itemVariants } from "./animation";



const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const componentExit = useAnimationStore((state) => state.componentExit);

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
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
    <Main page={"login"}>
      <LoginContainer>
        <AnimatePresence>
          {!componentExit.login && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              key="form"
            >
              <LoginForm onSubmit={submitForm}>
                <>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <Logo size={80} />
                  </motion.div>
                  <FormInfoContainer>
                    <h2>Bot Factory Dashboard</h2>
                    <motion.div variants={itemVariants}>
                      <InputContainer>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoFocus
                        />
                      </InputContainer>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <InputContainer className="last">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoFocus
                        />
                      </InputContainer>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <LoginButtonContainer>
                        <CheckboxContainer>
                          <Checkbox
                            id="remember"
                            onChange={(event) =>
                              setShouldRemember(event.target.checked)
                            }
                          />
                          <Label htmlFor="remember">Remember me</Label>
                        </CheckboxContainer>
                        <Button>Login</Button>
                      </LoginButtonContainer>
                    </motion.div>
                  </FormInfoContainer>
                </>
              </LoginForm>
            </motion.div>
          )}
        </AnimatePresence>
      </LoginContainer>
    </Main>
  );
};

export default Page;
