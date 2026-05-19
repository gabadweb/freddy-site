document.addEventListener("DOMContentLoaded", () => {
    const imagemBau = document.getElementById("imagem-bau");
    const somAbertura = document.getElementById("som-revelacao");
    
    // Pegando as telas
    const telaMisterio = document.getElementById("tela-misterio");
    const telaMensagem = document.getElementById("tela-mensagem");
    const telaCodigo = document.getElementById("tela-codigo");
    const telaFinal = document.getElementById("tela-final");
    
    // Pegando os botões novos
    const btnIrParaCodigo = document.getElementById("btn-ir-para-codigo");
    const btnIrParaMural = document.getElementById("btn-ir-para-mural");

    // 1. Clicou no Baú -> Vai para a Mensagem de Texto
    imagemBau.addEventListener("click", () => {
        const somSusto = document.getElementById("som-jumpscare");
        const containerJumpscare = document.getElementById("jumpscare-container");
        
        imagemBau.style.animation = "none";
        imagemBau.src = "assets/bau-aberto.png";
        imagemBau.style.transform = "scale(1.2)";
        
        // [PASSO 1] Ativa o Jumpscare e o som do susto IMEDIATAMENTE
        if (somSusto) {
            somSusto.volume = 1.0; 
            somSusto.play().catch(e => console.log(e));
        }
        if (containerJumpscare) {
            containerJumpscare.style.display = "flex"; 
        }

        // [PASSO 2] Espera 1.5 segundos de terror. Quando esse tempo acabar, TUDO muda junto:
        setTimeout(() => {
            // A) Esconde o monstro de vez (Corrigido o .style.style)
            if (containerJumpscare) {
                containerJumpscare.style.display = "none";
            }
            
            // B) Transiciona a tela de fundo (O baú some e a mensagem entra)
            telaMisterio.classList.remove("ativa");
            telaMensagem.classList.add("ativa"); 

            // C) Só AGORA a música fofa começa a tocar de mansinho com o Fade-in
            if (somAbertura) {
                somAbertura.volume = 0;
                somAbertura.play().catch(e => console.log("Áudio bloqueado:", e));
                
                let volumeFade = setInterval(() => {
                    if (somAbertura.volume < 0.9) {
                        somAbertura.volume += 0.1;
                    } else {
                        clearInterval(volumeFade);
                    }
                }, 200);
            }
        }, 2000); // 1.5 segundos cravados de susto antes da calmaria
    });
    // 2. Clicou na Mensagem ("Ver Surpresa") -> Vai para o Código VP
    if (btnIrParaCodigo) {
        btnIrParaCodigo.addEventListener("click", () => {
            telaMensagem.classList.remove("ativa");
            telaCodigo.classList.add("active"); // Caso o CSS use active ou ativa
            telaCodigo.classList.add("ativa"); 
        });
    }

    // 3. Clicou no Código ("Aqui, Sasa!") -> Vai para o Mural Roxo
    if (btnIrParaMural) {
        btnIrParaMural.addEventListener("click", () => {
            telaCodigo.classList.remove("ativa");
            telaFinal.classList.add("ativa"); // Encerra com os favoritos dela
        });
    }
});

// A função da música fica perfeitamente isolada aqui fora
function toggleMusica() {
    const musica = document.getElementById("som-revelacao");
    const containerMusica = document.querySelector(".item-musica");
    const statusTexto = document.querySelector(".status-musica");

    if (musica.paused) {
        musica.play();
        if (containerMusica) containerMusica.classList.remove("musica-pausada");
        if (statusTexto) statusTexto.innerText = "Tocando";
    } else {
        musica.pause();
        if (containerMusica) containerMusica.classList.add("musica-pausada");
        if (statusTexto) statusTexto.innerText = "Pausado";
    }
}
const btnCopiar = document.getElementById("btn-copiar");
    const textoCodigo = document.getElementById("texto-codigo-vp");

    if (btnCopiar && textoCodigo) {
        btnCopiar.addEventListener("click", () => {
            navigator.clipboard.writeText(textoCodigo.innerText).then(() => {
                // Feedback visual rápido de sucesso
                btnCopiar.style.background = "#00f5d4"; // Muda para verde/ciano temporariamente
                btnCopiar.style.color = "#000";
                
                setTimeout(() => {
                    btnCopiar.style.background = ""; // Volta ao normal
                    btnCopiar.style.color = "";
                }, 1000);
            }).catch(err => {
                console.error("Erro ao copiar: ", err);
            });
        });
    }