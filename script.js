document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const stars = document.querySelectorAll('.rating-stars i');
    const form = document.querySelector('.feedback-form');
    const successMessage = document.querySelector('.feedback-success');
    const submitBtn = document.querySelector('.submit-btn');

    // Variáveis de estado
    let selectedRating = 0;
    let isFormValid = false;

    // Função para atualizar as estrelas
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Evento de clique nas estrelas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            updateStars(selectedRating);
        });

        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateStars(rating);
        });

        star.addEventListener('mouseout', () => {
            updateStars(selectedRating);
        });
    });

    // Validação do formulário
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();
        const source = document.querySelector('input[name="source"]:checked');
        const resources = document.querySelectorAll('input[type="checkbox"]:checked');

        // Validação básica
        if (!name || !email || !feedback || !source || resources.length === 0 || selectedRating === 0) {
            return false;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    }

    // Atualização do estado do botão
    function updateSubmitButton() {
        isFormValid = validateForm();
        submitBtn.disabled = !isFormValid;
        submitBtn.style.opacity = isFormValid ? '1' : '0.6';
        submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
    }

    // Eventos de input para validação em tempo real
    form.addEventListener('input', updateSubmitButton);
    form.addEventListener('change', updateSubmitButton);

    // Envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Simulação de envio (substitua por sua lógica real de envio)
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
            // Esconde o formulário e mostra a mensagem de sucesso
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Animações
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'scale(1)';
            }, 100);

            // Aqui você pode adicionar sua lógica de envio real
            // Por exemplo, usando fetch para enviar os dados para um servidor
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                feedback: document.getElementById('feedback').value,
                rating: selectedRating,
                source: document.querySelector('input[name="source"]:checked').value,
                resources: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
            };

            console.log('Dados do formulário:', formData);
            
        }, 1500);
    });

    // Inicialização
    updateSubmitButton();
}); 