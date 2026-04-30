import React, { useState } from 'react';

const ContactoPage = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <div className="contacto-page animate-slide-up">
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Contacto</h6>
            <h2 className="display-5 fw-bold text-dark">Estamos aquí para ayudarte</h2>
            <p className="text-muted fs-5 mt-3">Comunícate con nosotros para cualquier consulta o para solicitar una evaluación de tus requerimientos ambientales.</p>
          </div>
          
          <div className="row g-5 mt-3">
            {/* Formulario */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100">
                <h3 className="fw-bold mb-4">Envíanos un mensaje</h3>
                {!enviado ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Nombre Completo</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Correo Electrónico</label>
                      <input type="email" className="form-control form-control-lg bg-light border-0" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-bold text-uppercase">Mensaje</label>
                      <textarea className="form-control bg-light border-0" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg w-100 fw-bold rounded-pill">Enviar Mensaje</button>
                  </form>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-check-circle-fill text-success" style={{fontSize: '4rem'}}></i>
                    <h4 className="fw-bold mt-3">¡Mensaje Enviado!</h4>
                    <p className="text-muted">Nos pondremos en contacto contigo a la brevedad posible.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Información y Mapa */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-success text-white">
                <h3 className="fw-bold mb-4">Información de Contacto</h3>
                <ul className="list-unstyled mb-5 fs-5">
                  <li className="mb-4 d-flex align-items-start">
                    <i className="bi bi-geo-alt-fill me-3 fs-3"></i>
                    <div>
                      <strong>Dirección Principal:</strong><br/>
                      Mza. C Lote. 16 Santo Domingo Etapa 12<br/>
                      Lima, Perú
                    </div>
                  </li>
                  <li className="mb-4 d-flex align-items-center">
                    <i className="bi bi-telephone-fill me-3 fs-3"></i>
                    <div>
                      <strong>Teléfono:</strong><br/>
                      +51 984 654 112
                    </div>
                  </li>
                  <li className="mb-4 d-flex align-items-center">
                    <i className="bi bi-envelope-fill me-3 fs-3"></i>
                    <div>
                      <strong>Correo Electrónico:</strong><br/>
                      contacto@econexus.com.pe
                    </div>
                  </li>
                </ul>
                
                <h4 className="fw-bold mb-3">Encuéntranos</h4>
                <div className="rounded-3 overflow-hidden shadow" style={{ height: '250px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.9168936657997!2d-76.99477012586616!3d-11.980287440662243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c56d1162eb01%3A0xc3b7cb780ec4a7a8!2sSan%20Juan%20de%20Lurigancho!5e0!3m2!1ses-419!2spe!4v1714532152844!5m2!1ses-419!2spe" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Econexus Contacto"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
