"use client";
import { useAuth } from "@/hooks/auth";
import { Main, MainContainer, TitleContainer } from "@/components/Layout/Layout";
import { MoonLoader } from "react-spinners";
import { useStore } from "@/store/store";
import { Nav } from "@/components/Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import Filters from "@/components/Filters/Filters";
import { useEffect, useState } from "react";
import { AbsoluteButton } from "@/components/Button/Button";
import { ClientList } from "@/components/ClientList/ClientList";
import { toastError } from "@/lib/notifications";
import axios from "@/lib/axios";

const motionStyle = {
  maxWidth: "1200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "70",
  flexWrap: "wrap",
  rowGap: "20px",
  columnGap: "20px",
  textAlign: "center",
}

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0,
    },
  },
  exit: {
    opacity: 0,
    y: -1000,
    transition: { duration: 0.5 },
  },

};

const containerVariants = {
  hidden: { opacity: 0 }, 
  visible: {
    opacity: 1, 
    transition: {
      type: "spring",
      stiffness: 100, 
      damping: 12, 
      delay: 1, 
      delayChildren: 1, 
      staggerChildren: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -1000, 
    transition: { duration: 0.5 }
  }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, 
    opacity: 1, 
    transition: {
      type: "spring",
      stiffness: 200, 
      damping: 20 
    }
  },
  exit: {
    opacity: 0,
    y: -20, 
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  const { user, logout } = useAuth({ middleware: 'auth' })
  const components = useStore((state) => state.componentExit);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('')
  const componentExit = useStore((state) => state.componentExit);

  useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
  }, [user]); 

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.get(`/api/clients?user=${user.id}`)
            setClients(response.data.data)
        } catch (error) {
            setError(
                'We could not find information. Try again later.',
            )
            toastError('Server error. Try again later.')
        } finally {
        }
    }
    fetchData()
}, [user])

  if (loading) {
    return (<>
      <Main>
        <MoonLoader color="#000" size={50} />
      </Main>
      </>
    );
  }
if(user && !loading){
  return (<>
      <AnimatePresence>
        <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={navVariants}
        >
      <Nav />
      </motion.div>
        <Main>
        {!componentExit.clients && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        > 
            <MainContainer>
            <motion.div variants={itemVariants} >
                <h1>Welcome to BotFactory!</h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                <p>Here you can create, edit, update and delete your clients. Search by name, surname or population or filter them!</p>
                </motion.div>

                <motion.div variants={itemVariants} style={motionStyle}>
                    <SearchBar />
                    <Filters />
                </motion.div>
                <motion.div variants={itemVariants} style={motionStyle}>
                    <ClientList data={clients} />
                </motion.div>

            </MainContainer>



        </motion.div>
        )}
            </Main>
      </AnimatePresence>
    </>
  )
}}


