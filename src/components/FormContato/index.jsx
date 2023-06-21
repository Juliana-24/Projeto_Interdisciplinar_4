import "./styles.css";

export default function FormContato() {
  return (
    <div className="containerFormContato">
      <div className="containerForm">
        <h1>Contato</h1>
        <p>Mande sua mensagem, que vamos entrar em contato com você</p>
        <form>
          <input type="text" placeholder="Digite seu nome" />
          <input type="email" placeholder="Digite seu email" />
          <input type="tel" placeholder="Digite seu telefone" />
          <textarea
            name="textArea"
            id="textArea"
            cols="30"
            rows="10"
            placeholder="Digite sua mensagem"
          ></textarea>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
}
