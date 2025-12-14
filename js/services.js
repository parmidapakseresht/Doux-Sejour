document.addEventListener('DOMContentLoaded', init);

function init() {
  var modalRoot = document.getElementById('modal-root');

  // Ouvre un modal : on passe un titre, un élément <form> (ou autre) et une fonction onSubmit
  function openModal(title, contentElement, onSubmit) {
    // Créer le fond
    var backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');

    // Créer la boîte du modal
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal';

    // Entête
    var header = document.createElement('header');
    header.textContent = title;

    // Corps (on y ajoute l'élément de contenu passé en argument)
    var body = document.createElement('div');
    body.className = 'body';
    body.appendChild(contentElement);

    // Actions (boutons)
    var actions = document.createElement('div');
    actions.className = 'actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.id = 'cancel-btn';
    cancelBtn.textContent = 'Annuler';

    var submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'submit-btn';
    submitBtn.textContent = 'Envoyer';

    actions.appendChild(cancelBtn);
    actions.appendChild(submitBtn);

    // Assembler
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(actions);
    backdrop.appendChild(modal);

    // Afficher dans le DOM
    modalRoot.innerHTML = '';
    modalRoot.appendChild(backdrop);
    modalRoot.classList.remove('hidden');
    modalRoot.setAttribute('aria-hidden', 'false');

    // Fermer le modal
    function close() {
      modalRoot.classList.add('hidden');
      modalRoot.setAttribute('aria-hidden', 'true');
      modalRoot.innerHTML = '';
      // enlever le listener clavier
      document.removeEventListener('keydown', escHandler);
    }

    // Clic sur Annuler
    cancelBtn.addEventListener('click', function () {
      close();
    });

    // Clic sur le fond (ferme si on clique en dehors de la boîte)
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        close();
      }
    });

    // Soumission (bouton Envoyer)
    submitBtn.addEventListener('click', function () {
      var form = contentElement.tagName === 'FORM' ? contentElement : contentElement.querySelector('form');
      if (!form) {
        close();
        return;
      }
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        // si une clé existe déjà (ex : radios), garder la première valeur
        if (data[key] === undefined) {
          data[key] = value;
        }
      });

      // Appeler la fonction fournie pour valider / traiter
      var valid = true;
      if (typeof onSubmit === 'function') {
        valid = onSubmit(data);
      }
      if (valid !== false) {
        close();
      }
    });

    // Fermer avec Échap
    function escHandler(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        close();
      }
    }
    document.addEventListener('keydown', escHandler);
  }

  // Crée le formulaire pour le petit-déjeuner
  function createBreakfastForm() {
    var form = document.createElement('form');
    form.id = 'breakfast-form';

    var labelRoom = document.createElement('label');
    labelRoom.setAttribute('for', 'room');
    labelRoom.textContent = 'N° de chambre *';
    var inputRoom = document.createElement('input');
    inputRoom.id = 'room';
    inputRoom.name = 'room';
    inputRoom.type = 'number';
    inputRoom.min = '1';
    inputRoom.required = true;

    var labelName = document.createElement('label');
    labelName.setAttribute('for', 'name');
    labelName.textContent = 'Nom *';
    var inputName = document.createElement('input');
    inputName.id = 'name';
    inputName.name = 'name';
    inputName.type = 'text';
    inputName.required = true;

    var labelTime = document.createElement('label');
    labelTime.setAttribute('for', 'time');
    labelTime.textContent = 'Heure souhaitée *';
    var inputTime = document.createElement('input');
    inputTime.id = 'time';
    inputTime.name = 'time';
    inputTime.type = 'time';
    inputTime.required = true;

    var labelVeg = document.createElement('label');
    labelVeg.textContent = 'Végétarien ?';

    var vegYesLabel = document.createElement('label');
    var vegYes = document.createElement('input');
    vegYes.type = 'radio';
    vegYes.name = 'vegetarian';
    vegYes.value = 'oui';
    vegYes.checked = true;
    vegYesLabel.appendChild(vegYes);
    vegYesLabel.appendChild(document.createTextNode(' Oui'));

    var vegNoLabel = document.createElement('label');
    var vegNo = document.createElement('input');
    vegNo.type = 'radio';
    vegNo.name = 'vegetarian';
    vegNo.value = 'non';
    vegNoLabel.appendChild(vegNo);
    vegNoLabel.appendChild(document.createTextNode(' Non'));

    form.appendChild(labelRoom);
    form.appendChild(inputRoom);
    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelTime);
    form.appendChild(inputTime);
    form.appendChild(labelVeg);
    form.appendChild(vegYesLabel);
    form.appendChild(vegNoLabel);

    return form;
  }

  // Crée le formulaire pour le nettoyage
  function createCleaningForm() {
    var form = document.createElement('form');
    form.id = 'cleaning-form';

    var labelRoom = document.createElement('label');
    labelRoom.setAttribute('for', 'room-clean');
    labelRoom.textContent = 'N° de chambre *';
    var inputRoom = document.createElement('input');
    inputRoom.id = 'room-clean';
    inputRoom.name = 'room';
    inputRoom.type = 'number';
    inputRoom.min = '1';
    inputRoom.required = true;

    var labelDate = document.createElement('label');
    labelDate.setAttribute('for', 'date');
    labelDate.textContent = 'Date *';
    var inputDate = document.createElement('input');
    inputDate.id = 'date';
    inputDate.name = 'date';
    inputDate.type = 'date';
    inputDate.required = true;

    var labelTime = document.createElement('label');
    labelTime.setAttribute('for', 'time-clean');
    labelTime.textContent = 'Heure *';
    var inputTime = document.createElement('input');
    inputTime.id = 'time-clean';
    inputTime.name = 'time';
    inputTime.type = 'time';
    inputTime.required = true;

    var labelNotes = document.createElement('label');
    labelNotes.setAttribute('for', 'notes');
    labelNotes.textContent = 'Remarques (optionnel)';
    var inputNotes = document.createElement('input');
    inputNotes.id = 'notes';
    inputNotes.name = 'notes';
    inputNotes.type = 'text';

    form.appendChild(labelRoom);
    form.appendChild(inputRoom);
    form.appendChild(labelDate);
    form.appendChild(inputDate);
    form.appendChild(labelTime);
    form.appendChild(inputTime);
    form.appendChild(labelNotes);
    form.appendChild(inputNotes);

    return form;
  }

  // Crée le formulaire pour le transport
  function createTransportForm() {
    var form = document.createElement('form');
    form.id = 'transport-form';

    var labelDest = document.createElement('label');
    labelDest.setAttribute('for', 'dest');
    labelDest.textContent = 'Destination *';
    var inputDest = document.createElement('input');
    inputDest.id = 'dest';
    inputDest.name = 'destination';
    inputDest.type = 'text';
    inputDest.required = true;

    var labelPhone = document.createElement('label');
    labelPhone.setAttribute('for', 'phone');
    labelPhone.textContent = 'Téléphone *';
    var inputPhone = document.createElement('input');
    inputPhone.id = 'phone';
    inputPhone.name = 'phone';
    inputPhone.type = 'tel';
    inputPhone.required = true;

    var labelDate = document.createElement('label');
    labelDate.setAttribute('for', 'date-t');
    labelDate.textContent = 'Date *';
    var inputDate = document.createElement('input');
    inputDate.id = 'date-t';
    inputDate.name = 'date';
    inputDate.type = 'date';
    inputDate.required = true;

    var labelTime = document.createElement('label');
    labelTime.setAttribute('for', 'time-t');
    labelTime.textContent = 'Heure *';
    var inputTime = document.createElement('input');
    inputTime.id = 'time-t';
    inputTime.name = 'time';
    inputTime.type = 'time';
    inputTime.required = true;

    var labelPassengers = document.createElement('label');
    labelPassengers.setAttribute('for', 'passengers');
    labelPassengers.textContent = 'Passagers (optionnel)';
    var inputPassengers = document.createElement('input');
    inputPassengers.id = 'passengers';
    inputPassengers.name = 'passengers';
    inputPassengers.type = 'number';
    inputPassengers.min = '1';

    form.appendChild(labelDest);
    form.appendChild(inputDest);
    form.appendChild(labelPhone);
    form.appendChild(inputPhone);
    form.appendChild(labelDate);
    form.appendChild(inputDate);
    form.appendChild(labelTime);
    form.appendChild(inputTime);
    form.appendChild(labelPassengers);
    form.appendChild(inputPassengers);

    return form;
  }

  // Lier les boutons de la page aux actions
  var btnBreakfast = document.getElementById('btn-breakfast');
  if (btnBreakfast) {
    btnBreakfast.addEventListener('click', function () {
      var form = createBreakfastForm();
      openModal('Commande petit-déjeuner', form, function (data) {
        // Validation simple
        if (!data.room || !data.name || !data.time) {
          window.alert('Veuillez remplir tous les champs obligatoires.');
          return false;
        }
        window.alert('Petit-déjeuner réservé:\\nChambre ' + data.room + '\\nNom: ' + data.name + '\\nHeure: ' + data.time + '\\nVégétarien: ' + (data.vegetarian || 'non'));
        console.log('breakfast', data);
        // Retourner true ou rien pour fermer le modal
      });
    });
  }

  var btnCleaning = document.getElementById('btn-cleaning');
  if (btnCleaning) {
    btnCleaning.addEventListener('click', function () {
      var form = createCleaningForm();
      openModal('Demande de nettoyage', form, function (data) {
        if (!data.room || !data.date || !data.time) {
          window.alert('Veuillez remplir tous les champs obligatoires.');
          return false;
        }
        window.alert('Nettoyage réservé:\\nChambre ' + data.room + '\\nDate: ' + data.date + '\\nHeure: ' + data.time);
        console.log('cleaning', data);
      });
    });
  }

  var btnTransport = document.getElementById('btn-transport');
  if (btnTransport) {
    btnTransport.addEventListener('click', function () {
      var form = createTransportForm();
      openModal('Réservation transport', form, function (data) {
        if (!data.destination || !data.phone || !data.date || !data.time) {
          window.alert('Veuillez remplir tous les champs obligatoires.');
          return false;
        }
        window.alert('Transport réservé:\\nDestination: ' + data.destination + '\\nTéléphone: ' + data.phone + '\\n' + data.date + ' ' + data.time);
        console.log('transport', data);
      });
    });
  }
}