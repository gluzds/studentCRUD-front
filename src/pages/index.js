import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { NewStudentModal } from '../components/NewStudentModal'
import { BsPlusLg, BsSearch } from 'react-icons/bs'
import { StudentsTable } from '../components/StudentsTable';
import { SearchModal } from '../components/SearchModal';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const [newStudentModalIsOpen, setNewStudentModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Estudantes CRUD</title>
      </Head>
      <h1 className={styles.title}>Estudantes CRUD</h1>
      <div className={styles.buttonDiv}>
        <button
          className={styles.add}
          onClick={() => setNewStudentModalIsOpen(true)}>
          <BsPlusLg size={12} /> Adicionar</button>
        <button
          className={styles.search}
          onClick={() => setSearchModalIsOpen(true)}>
          <BsSearch size={12} /> Buscar
        </button>
      </div>
      <StudentsTable newStudentModalIsOpen={newStudentModalIsOpen}/>
      <NewStudentModal
        handleCloseModal={() => setNewStudentModalIsOpen(false)}
        handleOpenModal={() => setNewStudentModalIsOpen(true)}
        modalIsOpen={newStudentModalIsOpen}
      />
      <SearchModal
        handleCloseModal={() => setSearchModalIsOpen(false)}
        handleOpenModal={() => setSearchModalIsOpen(true)}
        modalIsOpen={searchModalIsOpen}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  )
}
