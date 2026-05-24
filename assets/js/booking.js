(function () {

	var modal       = document.getElementById('booking-modal');
	var modalForm   = document.getElementById('modal-form');
	var modalConfirm= document.getElementById('modal-confirm');
	var sessionLabel= document.getElementById('modal-session-name');
	var confirmDetail = document.getElementById('confirm-detail');

	function openModal(sessionName) {
		modalForm.classList.remove('hidden');
		modalConfirm.classList.remove('visible');
		clearErrors();

		document.getElementById('input-name').value  = '';
		document.getElementById('input-email').value = '';
		document.getElementById('input-level').value = '';

		sessionLabel.textContent = sessionName;
		modal.classList.add('open');
		document.getElementById('input-name').focus();
	}

	function closeModal() {
		modal.classList.remove('open');
	}

	function validateField(rowId, isValid) {
		var row = document.getElementById(rowId);
		if (isValid) {
			row.classList.remove('has-error');
		} else {
			row.classList.add('has-error');
		}
		return isValid;
	}

	function clearErrors() {
		['field-name', 'field-email', 'field-level'].forEach(function(id) {
			document.getElementById(id).classList.remove('has-error');
		});
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function submitBooking() {
		var name  = document.getElementById('input-name').value.trim();
		var email = document.getElementById('input-email').value.trim();
		var level = document.getElementById('input-level').value;

		var nameOk  = validateField('field-name',  name.length > 1);
		var emailOk = validateField('field-email', isValidEmail(email));
		var levelOk = validateField('field-level', level !== '');

		if (!nameOk || !emailOk || !levelOk) return;

		confirmDetail.innerHTML =
			'<strong>Session:</strong> ' + sessionLabel.textContent + '<br>' +
			'<strong>Name:</strong> '    + name  + '<br>' +
			'<strong>Email:</strong> '   + email + '<br>' +
			'<strong>Level:</strong> '   + level;

		modalForm.classList.add('hidden');
		modalConfirm.classList.add('visible');
	}

	var bookButtons = document.querySelectorAll('.session-row .btn-yellow');
	bookButtons.forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			var row = btn.closest('.session-row');
			var sessionName = row.querySelector('.session-name').textContent;
			var sessionDate = row.querySelector('.session-date').textContent.trim();
			openModal(sessionName + ' — ' + sessionDate);
		});
	});

	document.getElementById('modal-close').addEventListener('click', closeModal);

	document.getElementById('modal-cancel').addEventListener('click', closeModal);

	document.getElementById('modal-done').addEventListener('click', closeModal);

	document.getElementById('modal-submit').addEventListener('click', submitBooking);

	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') closeModal();
	});

	modal.addEventListener('click', function(e) {
		if (e.target === modal) closeModal();
	});

})();