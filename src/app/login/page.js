"use client";
import Button from "@/components/Button/Button";
import { Checkbox, CheckboxContainer } from "@/components/Form/Checkbox";
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
import { toastError, toastSuccess } from "@/lib/notifications";
import { useStore } from "@/store/store";
import { AnimatePresence, delay, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidMessageDots } from "react-icons/bi";

const containerVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    rotate: 360,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 230,
      damping: 40,
      delayChildren: 0.4,
      staggerChildren: 0.2,
      delay: 1
    },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
};


const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
/*   const searchParams = useSearchParams();
  const reset = searchParams.get("reset"); */



const componentExit = useStore((state) => state.componentExit);
  
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });


console.log(componentExit.login)

 /*  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset));
    } else {
      setStatus(null);
    }
    if (reset) {
      toastSuccess("Contraseña cambiada con éxito");
    }
  }, [reset, router.reset, errors]);
 */
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
      })
  };

  return (
    <Main>
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
                      <LogoContainer>
                        <BiSolidMessageDots />
                      </LogoContainer>
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
