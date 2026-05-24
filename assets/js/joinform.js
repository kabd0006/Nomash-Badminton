(function () {

	var modal       = document.getElementById('join-modal');
	var modalForm   = document.getElementById('join-modal-form');
	var modalConfirm= document.getElementById('join-modal-confirm');
	var teamLabel   = document.getElementById('join-modal-team');
	var closeBtn    = document.getElementById('join-modal-close');
	var cancelBtn   = document.getElementById('join-modal-cancel');
	var submitBtn   = document.getElementById('join-modal-submit');
	var doneBtn     = document.getElementById('join-modal-done');

	var nameInput   = document.getElementById('jm-input-name');
	var emailInput  = document.getElementById('jm-input-email');
	var typeSelect  = document.getElementById('jm-input-type');

	var priceBar    = document.getElementById('jm-price-bar');
	var priceDetail = document.getElementById('jm-price-detail');
	var priceAmount = document.getElementById('jm-price-amount');
	var confirmDetail = document.getElementById('join-confirm-detail');

	var currentTeam = '';

	var typeLabels = {
		'120': 'Full Membership',
		'60':  'Concession Membership',
		'30':  'Student Membership'
	};

	document.querySelectorAll('.join-now-btn').forEach(function (btn) {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			currentTeam = btn.getAttribute('data-team');
			openModal(currentTeam);
		});
	});

	function openModal(team) {
		teamLabel.textContent = team;
		resetForm();
		modal.classList.add('open');
		document.body.style.overflow = 'hidden';
		nameInput.focus();
	}

	function closeModal() {
		modal.classList.remove('open');
		document.body.style.overflow = '';
	}

	function resetForm() {
		nameInput.value  = '';
		emailInput.value = '';
		typeSelect.value = '';
		document.querySelectorAll('#join-modal-form .form-row').forEach(function (r) {
			r.classList.remove('has-error');
		});
		updatePrice();
		modalForm.classList.remove('hidden');
		modalConfirm.classList.remove('visible');
	}

	closeBtn.addEventListener('click', closeModal);
	cancelBtn.addEventListener('click', closeModal);
	doneBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', function (e) {
		if (e.target === modal) closeModal();
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
	});

	typeSelect.addEventListener('change', function () {
		document.getElementById('jm-field-type').classList.remove('has-error');
		updatePrice();
	});

	function updatePrice() {
		var val = typeSelect.value;
		if (val) {
			priceAmount.textContent = '$' + val;
			priceAmount.classList.add('updated');
			priceDetail.textContent = typeLabels[val] + ' · per year';
			priceBar.classList.add('has-price');
		} else {
			priceAmount.innerHTML = '&mdash;';
			priceAmount.classList.remove('updated');
			priceDetail.textContent = 'Select a membership type above';
			priceBar.classList.remove('has-price');
		}
	}

	nameInput.addEventListener('input', function () {
		if (nameInput.value.trim().length >= 2)
			document.getElementById('jm-field-name').classList.remove('has-error');
	});

	emailInput.addEventListener('input', function () {
		if (isValidEmail(emailInput.value))
			document.getElementById('jm-field-email').classList.remove('has-error');
	});

	function isValidEmail(v) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
	}

	function validateRow(rowId, check) {
		var row = document.getElementById(rowId);
		if (!check()) {
			row.classList.add('has-error');
			return false;
		}
		row.classList.remove('has-error');
		return true;
	}

	submitBtn.addEventListener('click', function () {
		var v1 = validateRow('jm-field-name',  function(){ return nameInput.value.trim().length >= 2; });
		var v2 = validateRow('jm-field-email', function(){ return isValidEmail(emailInput.value); });
		var v3 = validateRow('jm-field-type',  function(){ return typeSelect.value !== ''; });

		if (!v1 || !v2 || !v3) return;

		confirmDetail.innerHTML =
			'<strong>Name:</strong> '   + nameInput.value.trim()   + '<br>' +
			'<strong>Email:</strong> '  + emailInput.value.trim()  + '<br>' +
			'<strong>Team:</strong> '   + currentTeam              + '<br>' +
			'<strong>Type:</strong> '   + typeLabels[typeSelect.value] + '<br>' +
			'<strong>Fee:</strong> $'   + typeSelect.value + ' / year';

		modalForm.classList.add('hidden');
		modalConfirm.classList.add('visible');
	});

})();