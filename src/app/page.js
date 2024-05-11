"use client";
import { useAuth } from "@/hooks/auth";
import {
  Main,
  MainContainer,
} from "@/components/Layout/Layout";
import { MoonLoader } from "react-spinners";
import { useAnimationStore, useParamsStore } from "@/store/store";
import { Nav } from "@/components/Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import Filters from "@/components/Filters/Filters";
import { useEffect, useState } from "react";
import { ClientList } from "@/components/ClientList/ClientList";
import { toastError } from "@/lib/notifications";
import axios from "@/lib/axios";
import { containerVariants, itemVariants, motionStyle } from "./animations";


export default function Home() {
  const { user } = useAuth({ middleware: "auth" });
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const componentExit = useAnimationStore((state) => state.componentExit);
  const [showIntro, setShowIntro] = useState(true);
  const params = useParamsStore((state) => state.params);
  const setParams = useParamsStore((state) => state.setParams);
  const buildUrl = useParamsStore((state) => state.buildUrl);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(buildUrl(params));
        setClients(response.data.data)
        setParams("total", response.data.total);
        setParams("current_page", response.data.current_page);
      } catch (error) {
        setError("We could not find information. Try again later.");
        toastError("Server error. Try again later.");
        throw error;
      } finally {
      }
    };
    fetchData();
  }, [user, showIntro, params.current_page, params.search, params.bigger_than, params.smaller_than, params.category, params.active]);

  if (loading) {
    return (
      <>
        <Main>
          <MoonLoader color="#000" size={50} />
        </Main>
      </>
    );
  }

  if (user && !loading) {
    return (
      <>
        <AnimatePresence>
          {!componentExit.clients && (<>
            <Nav />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              
              <Main>
                <MainContainer padding={showIntro}>
                  {showIntro && (
                    <>
                      <motion.div variants={itemVariants}>
                        <h1>Welcome to BotFactory!</h1>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <p>
                          Here you can create, edit, update and delete your
                          clients. Search by name, surname or population or
                          filter them!
                        </p>
                      </motion.div>
                      <motion.div variants={itemVariants} style={motionStyle}>
                        <SearchBar />
                        <Filters />
                      </motion.div>
                    </>
                  )}
                  <motion.div variants={itemVariants} style={motionStyle}>
                    <ClientList data={clients} setShowIntro={setShowIntro}/>
                  </motion.div>
                  <motion.div variants={itemVariants} style={motionStyle}>
                  
                  </motion.div>
                </MainContainer>
              </Main>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
}
