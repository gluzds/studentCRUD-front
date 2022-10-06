import { useState, useEffect } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Image from 'next/image'
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import { UpdateStudentModal } from '../UpdateStudentModal';
import { api } from '../../services/api'
import styles from './styles.module.scss';
import { ImageModal } from '../ImageModal';

export function StudentsTable(props) {
  const [updateStudentModalIsOpen, setUpdateStudentModalIsOpen] = useState(false);
  const [deleteStudentModalIsOpen, setDeleteStudentModalIsOpen] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [students, setStudents] = useState([]);
  const imageURL = process.env.NEXT_PUBLIC_IMAGES_URL

  useEffect(() => {
    api.get('/students').then(response =>
      setStudents(response.data)
    )
  }, [deleteStudentModalIsOpen])

  function handleUpdateStudent(obj) {
    setCurrentStudent(obj);
    setUpdateStudentModalIsOpen(true);
  }

  function handleDeleteStudent(obj) {
    setCurrentStudent(obj);
    setDeleteStudentModalIsOpen(true);
  }

  function handleImageShow(obj) {
    setCurrentStudent(obj);
    setImageModalIsOpen(true);
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students?.slice(0).reverse().map(student => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={`${imageURL}${student.photo}`}
                    alt="Foto do estudante"
                    width={40}
                    height={40}
                    onClick={() => handleImageShow(student)}
                  />
                </div>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => handleUpdateStudent(student)}>
                    <BsPencil size={12} /> Editar
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteStudent(student)}>
                    <BsTrash size={12} /> Deletar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <UpdateStudentModal
        handleCloseModal={() => setUpdateStudentModalIsOpen(false)}
        handleOpenModal={() => setUpdateStudentModalIsOpen(true)}
        modalIsOpen={updateStudentModalIsOpen}
        student={currentStudent}
      />
      <DeleteConfirmationModal
        handleCloseModal={() => setDeleteStudentModalIsOpen(false)}
        handleOpenModal={() => setDeleteStudentModalIsOpen(true)}
        modalIsOpen={deleteStudentModalIsOpen}
        student={currentStudent}
      />
      <ImageModal
        handleCloseModal={() => setImageModalIsOpen(false)}
        handleOpenModal={() => setImageModalIsOpen(true)}
        modalIsOpen={imageModalIsOpen}
        student={currentStudent}
      />
    </>
  )
}