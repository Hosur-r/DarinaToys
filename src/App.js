import Modal from "./components/modalWin/ModalWin";
import { useState } from "react";

function App() {

    const [isModal, setModal] = useState(true);
    let content = 
        <form className="modalForm">
            <input placeholder="Введите логин" className="modalField" type="text"/>
            <input placeholder="Введите e-mail" className="modalField" type="email"/>
            <input placeholder="Введите пароль" className="modalField" type="password"/>
            <input placeholder="Повторите пароль" className="modalField" type="password"/>
            <button type="submit" className="modalBtn">Войти</button>
        </form>

    let footer = 
    <p className="noAccount">
      Нет аккаунта? <button className="noAccountBtn">Зарегистрироваться</button>
    </p>

  return (
    <div className="App">

           <Modal
              isVisible={isModal}
              title="Авторизация"
              content={content}
              footer={footer}
              onClose={() => setModal(false)}
            />

    </div>
  );
}

export default App;
