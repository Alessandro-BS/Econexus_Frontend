import useLocalStorage from '../../hooks/useLocalStorage';
import normativasSeed from '../../data/normativasSeed';
import NormativaTable from './NormativaTable';
import './NormativasPage.css';

function NormativasPage() {
  const [normativas] = useLocalStorage('eco_normativas', normativasSeed);

  return (
    <div className="normativas-page">
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-journal-bookmark-fill section-title-icon"></i>
            Normativas
          </h1>
          <p className="section-subtitle">
            Marco legal de autorizaciones y documentos de servicios ambientales.
          </p>
        </div>
      </div>

      <NormativaTable normativas={normativas} />
    </div>
  );
}

export default NormativasPage;
