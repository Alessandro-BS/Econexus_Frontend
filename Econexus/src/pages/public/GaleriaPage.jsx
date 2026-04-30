import React from 'react';

const GaleriaPage = () => {
  return (
    <div className="galeria-page animate-slide-up">
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Galería</h6>
            <h2 className="display-5 fw-bold text-dark">Nuestro Trabajo en Acción</h2>
            <p className="text-muted fs-5 mt-3">Un vistazo a nuestras operaciones en campo y el compromiso de nuestro equipo.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 1" className="img-fluid w-100 h-100 object-fit-cover transition-transform" style={{ minHeight: '300px' }} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 2" className="img-fluid w-100 h-100 object-fit-cover transition-transform" style={{ minHeight: '300px' }} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 3" className="img-fluid w-100 h-100 object-fit-cover transition-transform" style={{ minHeight: '300px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GaleriaPage;
