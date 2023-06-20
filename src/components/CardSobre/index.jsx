import "./styles.css";

export default function CardSobre(props) {
  return (
    <div className="containerCardSobre">
      <div className="containerIcone">{props.iconeCard}</div>
      <div className="containerTextosCard">
        <h3>{props.titulocard}</h3>
        <p>{props.textoCard}</p>
      </div>
    </div>
  );
}
