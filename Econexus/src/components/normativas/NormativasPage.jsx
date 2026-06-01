import useApiCrud from '../../hooks/useApiCrud';
import NormativaTable from './NormativaTable';
import './NormativasPage.css';

function NormativasPage() {
  const { data: normativas, loading, error } = useApiCrud('/normativas');

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

      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando normativas...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}
      {!loading && !error && <NormativaTable normativas={normativas} />}
    </div>
  );
}

export default NormativasPage;
