import Modal from 'react-modal';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

export function NewStudentModal(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();

  const handleChange = (e) => {
    const [f] = e.target.files;
    setImage(f);
  };

  async function handleCreateNewStudent(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('name', name);
    formData.append('address', address);
    if (name === "" || address === "" || image === undefined) {
      toast.error("Todos campos são obrigatórios.", { theme: "dark" })
    } else {
      api({
        url: 'students',
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 201) {
          toast.success("Estudante criado com sucesso!", { theme: "dark" });
          setName("")
          setAddress("")
          setImage()
          props.handleCloseModal();
        }
      }).catch((error) => {
        toast.error("Erro ao criar estudante: " + error, { theme: "dark" });
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
      <form className={styles.form} onSubmit={handleCreateNewStudent}>
        <h2>Cadastrar estudante</h2>
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
        <button type="submit">Cadastrar</button>
        <button onClick={props.handleCloseModal}>Fechar</button>
      </form>
    </Modal>
  )
}