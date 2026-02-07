import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const phrases = [
    "No",
    "¿Estás segura?",
    "¿De verdad?",
    "¡Piénsalo bien!",
    "¡Última oportunidad!",
    "¿Segura que no?",
    "¡Te podrías arrepentir!",
    "¡Dale otra pensada!",
    "¿Estás completamente segura?",
    "¡Esto podría ser un error!",
    "¡Ten corazón!",
    "¡No seas tan fría amor!",
    "¿Cambio de opinión?",
    "¿Por favor?",
    "¿Es tu respuesta final?",
    "Me estás rompiendo el corazón ;(",
];

function App() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const yesButtonSize = noCount * 20 + 16; // Base 16px, grows by 20px

    useEffect(() => {
        // Load images
        const images = import.meta.glob('./assets/memories/*.{png,jpg,jpeg,svg}', { eager: true });
        const imageUrls = Object.values(images).map(img => img.default);

        // Generate floating hearts and memories
        const bg = document.querySelector('.bg-hearts');

        const createParticle = () => {
            if (!bg) return;

            const heart = document.createElement('div');
            heart.classList.add('heart-particle');

            // Randomly decide if it's a heart or a photo (if photos exist)
            // Increased chance for photos since we want to see them all
            const isMemory = imageUrls.length > 0 && Math.random() < 0.4;

            if (isMemory) {
                // It's a memory!
                const img = document.createElement('img');
                img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                img.classList.add('floating-memory');

                // Clear any text and append image
                heart.innerHTML = '';
                heart.appendChild(img);

                // Make memories float slower
                var duration = Math.random() * 5 + 8; // 8-13s
                heart.style.animationDuration = duration + 's';
            } else {
                heart.innerHTML = '❤';
                var duration = Math.random() * 3 + 5; // 5-8s
                heart.style.animationDuration = duration + 's';
            }

            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';

            bg.appendChild(heart);

            // Cleanup after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        };

        // Create initial batch so screen isn't empty
        for (let i = 0; i < 15; i++) createParticle();

        // Continue spawning every 400ms
        const interval = setInterval(createParticle, 400);

        return () => clearInterval(interval);
    }, []);

    function handleNoClick() {
        setNoCount(noCount + 1);
    }

    function handleYesClick() {
        setYesPressed(true);
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ffe4e6', '#ec4899', '#be185d']
        });
    }

    function getNoButtonText() {
        return phrases[Math.min(noCount, phrases.length - 1)];
    }

    return (
        <>
            <div className="bg-hearts"></div>
            <div className="container">
                {yesPressed ? (
                    <>
                        <div className="gif-container">
                            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bear kissing" />
                        </div>
                        <h1>¡¡¡Siiii!!! ¡Vamos a estar juntos por siempre! ❤</h1>
                        <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: '#be185d' }}>
                            ¡Te amo infinitamente, amor de mi vida!
                        </p>
                    </>
                ) : (
                    <>
                        <div className="gif-container">
                            <img src="https://media.tenor.com/K2sE87D0c9UAAAAi/milk-and-mocha-cute.gif" alt="Cute bear asking" />
                        </div>
                        <h1>¿Quieres ser mi San Valentín?</h1>
                        <div className="btn-group">
                            <button
                                className="btn btn-yes"
                                style={{ fontSize: yesButtonSize + 'px' }}
                                onClick={handleYesClick}
                            >
                                Sí
                            </button>
                            <button
                                className="btn btn-no"
                                onClick={handleNoClick}
                            >
                                {getNoButtonText()}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default App
