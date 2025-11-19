document.addEventListener('DOMContentLoaded', () => {
  const modalRoot = document.getElementById('modal-root');

  const openModal = (title, innerHtml, onSubmit) => {
    modalRoot.innerHTML = `
      <div class="modal-backdrop" role="dialog" aria-modal="true">
        <div class="modal" id="modal">
          <header>${title}</header>
          <div class="body">
            ${innerHtml}
          </div>
          <div class="actions">
            <button id="cancel-btn" type="button">Annuler</button>
            <button id="submit-btn" type="button">Envoyer</button>
          </div>
        </div>
      </div>
    `;
    modalRoot.classList.remove('hidden');
    modalRoot.setAttribute('aria-hidden', 'false');

    const close = () => {
      modalRoot.classList.add('hidden');
      modalRoot.setAttribute('aria-hidden', 'true');
      modalRoot.innerHTML = '';
    };

    document.getElementById('cancel-btn').addEventListener('click', close);
    document.querySelector('.modal-backdrop').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) close();
    });
    document.getElementById('submit-btn').addEventListener('click', () => {
      const form = modalRoot.querySelector('form');
      if (!form) { close(); return; }
      const data = Object.fromEntries(new FormData(form));
      const valid = onSubmit && onSubmit(data);
      if (valid !== false) close();
    });

    const escHandler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', escHandler, { once: true });
  };

  // Petit-déjeuner
  document.getElementById('btn-breakfast').addEventListener('click', () => {
    const html = `
      <form id="breakfast-form">
        <label for="room">N° de chambre *</label>
        <input id="room" name="room" type="number" min="1" required>

        <label for="name">Nom *</label>
        <input id="name" name="name" type="text" required>

        <label for="time">Heure souhaitée *</label>
        <input id="time" name="time" type="time" required>

        <label>Végétarien ?</label>
        <label><input type="radio" name="vegetarian" value="oui" checked> Oui</label>
        <label><input type="radio" name="vegetarian" value="non"> Non</label>
      </form>
    `;
    openModal('Commande petit-déjeuner', html, (data) => {
      if (!data.room || !data.name || !data.time) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return false;
      }
      alert(`Petit-déjeuner réservé:\nChambre ${data.room}\nNom: ${data.name}\nHeure: ${data.time}\nVégétarien: ${data.vegetarian}`);
      console.log('breakfast', data);
    });
  });

  // Nettoyage
  document.getElementById('btn-cleaning').addEventListener('click', () => {
    const html = `
      <form id="cleaning-form">
        <label for="room-clean">N° de chambre *</label>
        <input id="room-clean" name="room" type="number" min="1" required>

        <label for="date">Date *</label>
        <input id="date" name="date" type="date" required>

        <label for="time-clean">Heure *</label>
        <input id="time-clean" name="time" type="time" required>

        <label for="notes">Remarques (optionnel)</label>
        <input id="notes" name="notes" type="text">
      </form>
    `;
    openModal('Demande de nettoyage', html, (data) => {
      if (!data.room || !data.date || !data.time) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return false;
      }
      alert(`Nettoyage réservé:\nChambre ${data.room}\nDate: ${data.date}\nHeure: ${data.time}`);
      console.log('cleaning', data);
    });
  });

  // Transport
  document.getElementById('btn-transport').addEventListener('click', () => {
    const html = `
      <form id="transport-form">
        <label for="dest">Destination *</label>
        <input id="dest" name="destination" type="text" required>

        <label for="phone">Téléphone *</label>
        <input id="phone" name="phone" type="tel" required>

        <label for="date-t">Date *</label>
        <input id="date-t" name="date" type="date" required>

        <label for="time-t">Heure *</label>
        <input id="time-t" name="time" type="time" required>

        <label for="passengers">Passagers (optionnel)</label>
        <input id="passengers" name="passengers" type="number" min="1">
      </form>
    `;
    openModal('Réservation transport', html, (data) => {
      if (!data.destination || !data.phone || !data.date || !data.time) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return false;
      }
      alert(`Transport réservé:\nDestination: ${data.destination}\nTéléphone: ${data.phone}\n${data.date} ${data.time}`);
      console.log('transport', data);
    });
  });
});