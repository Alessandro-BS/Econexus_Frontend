import React from 'react';

const NosotrosPage = () => {
  return (
    <div className="nosotros-page animate-slide-up">
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sobre Econexus" className="img-fluid rounded-4 shadow-lg" />
                <div className="experience-badge bg-success text-white p-4 rounded-circle position-absolute d-flex flex-column justify-content-center align-items-center shadow" style={{ bottom: '-30px', right: '-30px', width: '150px', height: '150px' }}>
                  <h3 className="fw-bold mb-0">15+</h3>
                  <span className="text-center small">Años de<br />Experiencia</span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
              <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Sobre Nosotros</h6>
              <h2 className="display-5 fw-bold mb-4 text-dark">Líderes en Saneamiento y Cuidado Ambiental</h2>
              <p className="lead text-secondary mb-4">
                En Econexus, nos dedicamos a ofrecer soluciones sostenibles y eficientes en saneamiento ambiental. Nuestro compromiso es garantizar un entorno limpio y seguro para empresas y comunidades.
              </p>
              <p className="text-secondary mb-4">
                A través de la innovación constante y el uso de tecnologías amigables con el ecosistema, abordamos los desafíos medioambientales más complejos, asegurando el cumplimiento normativo y promoviendo el bienestar integral.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Personal altamente capacitado</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Cumplimiento de normativas vigentes</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Compromiso con la sostenibilidad</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NosotrosPage;
