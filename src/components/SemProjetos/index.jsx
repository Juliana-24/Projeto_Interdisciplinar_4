import { MdOutlineNotInterested } from "react-icons/md";

import "./styles.css";

export default function SemProjetos() {
  return (
    <div className="containerSemProjetos">
      <MdOutlineNotInterested size={50} color="#7c7c7c" />
      <p>Você não possui nenhum projeto criado</p>
    </div>
  );
}
