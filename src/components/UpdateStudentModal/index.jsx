import Modal from 'react-modal';
import styles from './styles.module.scss';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

Modal.setAppElement('#__next');

export function UpdateStudentModal(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [ratio, setRatio] = useState(16 / 9);
  const imageURL = process.env.NEXT_PUBLIC_IMAGES_URL + props.student.photo

  useEffect(() => {
    setName(props.student.name);
    setAddress(props.student.address);
  }, [props]);

  const handleChange = (e) => {
    const [f] = e.target.files;
    setImage(f);
  };

  async function handleUpdateStudent(e) {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('name', name);
    formData.append('address', address);
    if (name === "" || address === "") {
      toast.error("Nome e endereço obrigatório.", { theme: "dark" })
      e.preventDefault()
    } else {
      const url = `students/` + props.student.id
      api({
        url,
        method: "PUT",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).catch((error) => {
        toast.error("Erro ao atualizar estudante: " + error, { theme: "dark" });
        e.preventDefault();
      })
    }
  }

  async function handleCreateNewStudent(e) {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('name', name);
    formData.append('address', address);
    if (name === "" || address === "") {
      toast.error("Nome e endereço obrigatório.", { theme: "dark" })
      e.preventDefault()
    } else {
      api({
        url: 'students',
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).catch((error) => {
        toast.error("Erro ao criar estudante: " + error, { theme: "dark" });
        e.preventDefault();
      })
    }
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <form action="" className={styles.form} onSubmit={handleUpdateStudent}>
        <h2>Atualizar estudante</h2>
        <div className={styles.image}>
          <Image src={imageURL}
            alt="Foto do estudante"
            width={200}
            height={200 / ratio}
            layout="fixed"
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)}
          />
        </div>
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={event => setAddress(event.target.value)}
        />
        <input
          type="file"
          id="image"
          accept="image/jpeg, image/jpg"
          onChange={handleChange}
        />
        <button type="submit">Atualizar</button>
        <button onClick={props.handleCloseModal}>Fechar</button>
      </form>
    </Modal>
  )
}