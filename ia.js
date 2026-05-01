// ==========================================
// INTEGRAÇÃO DE INTELIGÊNCIA ARTIFICIAL (GEMINI)
// ==========================================

const iaQuestions = [
    { q: "1. Qual a sua meta real de pontuação geral para Medicina?", opts: ["a) Apenas passar de 750+", "b) 780+ (Ampla em federais menos concorridas)", "c) 800+ (Ampla nas principais federais)", "d) 820+ (USP, UNICAMP, ou bolsa integral)"] },
    { q: "2. Quantas horas LÍQUIDAS você consegue estudar por dia?", opts: ["a) Menos de 4 horas", "b) De 4 a 6 horas", "c) De 6 a 8 horas", "d) Mais de 8 horas"] },
    { q: "3. Qual é a sua proporção atual de AULAS vs QUESTÕES no seu estudo?", opts: ["a) 80% Aulas / 20% Questões", "b) 50% Aulas / 50% Questões", "c) 30% Aulas / 70% Questões", "d) 100% Questões e flashcards (só vejo teoria na dúvida)"] },
    { q: "4. Quantas questões você costuma resolver por semana, em média?", opts: ["a) Menos de 100", "b) Entre 100 e 250", "c) Entre 250 e 500", "d) Mais de 500 questões"] },
    { q: "5. Qual o seu nível atual em Matemática (o grande pilar da TRI)?", opts: ["a) Muito fraco (acerto menos de 20)", "b) Intermediário (acerto entre 20 e 30)", "c) Avançado (acerto entre 30 e 38)", "d) Elite (acerto consistentemente mais de 38)"] },
    { q: "6. Qual o seu nível em Natureza (Física, Química, Biologia)?", opts: ["a) Base fraca (muita dificuldade com exatas)", "b) Acertei entre 20-25 no último ENEM", "c) Acertei entre 26-33 no último ENEM", "d) Elite (acerto mais de 35)"] },
    { q: "7. O que você faz quando não sabe resolver uma questão (principalmente exatas)?", opts: ["a) Pulo e nunca mais vejo", "b) Fico 30 minutos tentando e me frustro", "c) Vejo a resolução imediatamente e copio", "d) Tento por 5 min, se não for, vejo resolução e refaço depois"] },
    { q: "8. Quanto tempo você gasta em média assistindo uma teoria nova?", opts: ["a) 2h ou mais de videoaula por assunto", "b) 1h lendo apostila + 30 min de vídeo", "c) 30 a 45 minutos de videoaula direta ao ponto", "d) Leio resumo rápido de 10min e vou pras questões"] },
    { q: "9. Qual a sua frequência de Simulados (Modelo ENEM completo)?", opts: ["a) Não faço, tenho medo da nota", "b) 1 vez por mês ou menos", "c) A cada 15 dias", "d) Toda semana religiosamente"] },
    { q: "10. Quanto tempo você leva para corrigir um Simulado?", opts: ["a) Só olho o gabarito pra ver os acertos", "b) Meia horinha pra ver as que errei", "c) Umas 2 horas revisando erros", "d) 4 horas ou mais, faço um Raio-X de cada erro e crio flashcards"] },
    { q: "11. Como está o seu desempenho e velocidade nas Redações?", opts: ["a) Demoro mais de 2h e não bato 800", "b) Demoro 1h30, travo nos argumentos (800-880)", "c) Faço em 1h, nota consistente 900+", "d) Modelo fechado, faço em 45 min, tiro 940+ direto"] },
    { q: "12. Qual a sua técnica principal de Revisão para não esquecer matéria?", opts: ["a) Releio meus resumos antigos", "b) Faço um simulado de vez em quando", "c) Resolvo listas de questões antigas", "d) Sistema de Repetição Espaçada (Anki/Flashcards) diariamente"] },
    { q: "13. Como você gerencia o tempo no 2º Dia de prova (Mat e Nat)?", opts: ["a) Não gerencio, falto tempo pra umas 15", "b) Chuto as 10 últimas por falta de tempo", "c) Consigo fazer tudo apertado", "d) Sobra tempo para revisar as difíceis"] },
    { q: "14. Você tem o costume de mapear o padrão de recorrência do ENEM?", opts: ["a) Não, estudo tudo que tá no edital igual", "b) Já ouvi falar, dou preferência ao que cai mais", "c) Só estudo o que mais cai", "d) Sim, tenho a lista completa e treino por incidência"] },
    { q: "15. Em Linguagens e Humanas, como você aborda as questões?", opts: ["a) Leio o texto inteiro e depois a pergunta", "b) Leio metade e tento chutar", "c) Leio a pergunta, depois escaneio o texto", "d) Uso técnica de leitura ativa e acerto pelo comando da questão"] },
    { q: "16. Qual matéria você procrastina estudar porque odeia?", opts: ["a) Física", "b) Química", "c) Matemática", "d) Linguagens (textos chatos)"] },
    { q: "17. Como é a qualidade do seu foco durante a resolução de listas (Mode Foco)?", opts: ["a) Pego o celular a cada 10 minutos", "b) Uso pomodoro, mas me distraio fácil", "c) Consigo focar por 1 hora direto", "d) Foco profundo e ininterrupto por 2h seguidas"] },
    { q: "18. Se você tivesse que escolher a sua maior deficiência hoje, qual seria?", opts: ["a) Falta de base teórica nas matérias exatas", "b) Interpretação e agilidade de leitura", "c) Controle emocional e ansiedade", "d) Estratégia de prova e gestão do tempo"] },
    { q: "19. Sobre a TRI (Teoria da Resposta ao Item), você aplica a tática de nivelamento?", opts: ["a) Não, tento resolver tudo na ordem", "b) Mais ou menos, pulo as muito doidas", "c) Sim, faço as fáceis primeiro, deixo as difíceis", "d) Masterizei a TRI, sei identificar o que é difícil na hora e pulo"] },
    { q: "20. Você está preparado(a) para abrir mão de lazer excessivo pela Medicina?", opts: ["a) Ainda tenho dificuldade em dizer não para festas", "b) Estou cortando aos poucos", "c) Já estou bastante isolado para estudar", "d) O foco é 100% total, o ano é da aprovação"] }
];

let currentIaQuestion = 0;
let iaAnswers = [];

function checkIaSetup() {
    const key = localStorage.getItem('gemini_api_key');
    if (key) {
        document.getElementById('gemini-api-key').value = key;
        document.getElementById('gemini-api-key').type = 'password';
    }
}

function saveApiKey() {
    const key = document.getElementById('gemini-api-key').value.trim();
    if (!key) return showAlert("Por favor, insira a chave da API.");
    localStorage.setItem('gemini_api_key', key);
    showAlert("Chave da API salva no seu navegador com sucesso!");
}

function startIaQuiz() {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) return showAlert("Salve a chave da API antes de gerar o cronograma.");
    
    currentIaQuestion = 0;
    iaAnswers = [];
    document.getElementById('ia-setup-card').style.display = 'none';
    document.getElementById('ia-quiz-card').style.display = 'block';
    renderIaQuestion();
}

function cancelIaQuiz() {
    document.getElementById('ia-quiz-card').style.display = 'none';
    document.getElementById('ia-setup-card').style.display = 'block';
}

function renderIaQuestion() {
    const container = document.getElementById('quiz-container');
    const qData = iaQuestions[currentIaQuestion];
    document.getElementById('quiz-current-q').innerText = currentIaQuestion + 1;
    
    let html = `<p style="font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">${qData.q}</p><div style="display: flex; flex-direction: column; gap: 10px;">`;
    
    qData.opts.forEach((opt, idx) => {
        const isSelected = iaAnswers[currentIaQuestion] === idx;
        html += `<button class="btn-action" style="text-align: left; background: ${isSelected ? 'var(--primary)' : 'var(--bg)'}; color: ${isSelected ? '#000' : 'var(--text)'}; border: 1px solid var(--border);" onclick="selectIaAnswer(${idx})">${opt}</button>`;
    });
    html += `</div>`;
    
    container.innerHTML = html;
    
    const btnNext = document.getElementById('btn-next-question');
    if (currentIaQuestion === iaQuestions.length - 1) {
        btnNext.innerText = "Gerar Cronograma ✨";
        btnNext.style.background = "var(--success)";
    } else {
        btnNext.innerText = "Próxima";
        btnNext.style.background = "var(--primary)";
    }
}

function selectIaAnswer(idx) {
    iaAnswers[currentIaQuestion] = idx;
    renderIaQuestion();
}

function nextQuestion() {
    if (iaAnswers[currentIaQuestion] === undefined) {
        return showAlert("Por favor, selecione uma opção antes de continuar.");
    }
    
    if (currentIaQuestion < iaQuestions.length - 1) {
        currentIaQuestion++;
        renderIaQuestion();
    } else {
        generateIaSchedule();
    }
}

async function generateIaSchedule() {
    document.getElementById('ia-quiz-card').style.display = 'none';
    document.getElementById('ia-loading-card').style.display = 'block';
    
    let promptText = "Você é um mentor de alta performance especialista em ENEM, focado em estudantes que buscam APROVAÇÃO EM MEDICINA (necessitam de notas 800+ e muita estratégia de prova). Eu sou o estudante e acabei de responder a um diagnóstico rigoroso. Baseado estritamente nas minhas respostas e na minha disponibilidade de tempo, gere um cronograma de estudos para os próximos 7 dias (começando a partir de amanhã).\n\nMinhas respostas:\n";
    
    iaQuestions.forEach((q, i) => {
        promptText += `${q.q} R: ${q.opts[iaAnswers[i]]}\n`;
    });
    
    promptText += `\nCrie um cronograma semanal intenso e estratégico, focado em consertar minhas fraquezas nas exatas (se houver) e focar na TRI.
COLOQUE O MÁXIMO DE FOCO NO TRIPÉ: Aulas (só onde sou fraco), Questões (MUITAS, defina a quantidade exata) e Simulados.
Distribua a carga horária que eu marquei ter disponível de forma otimizada.
Retorne o resultado EXATAMENTE no seguinte formato JSON, sem marcações markdown ou outro texto, para que eu possa fazer parse diretamente:
[
  { "dayOffset": 1, "type": "aula", "materia": "Matemática", "content": "Funções (Foco total)", "startTime": "08:00", "endTime": "09:30" },
  { "dayOffset": 1, "type": "questoes", "materia": "Natureza", "content": "Física - Mecânica", "qnt": 45, "startTime": "10:00", "endTime": "12:00" },
  { "dayOffset": 2, "type": "redacao", "materia": "Redação", "content": "Eixo Saúde Pública", "startTime": "14:00", "endTime": "15:30" },
  { "dayOffset": 3, "type": "simulado", "materia": "Geral", "content": "Simulado ENEM - 2º Dia", "qnt": 90, "startTime": "13:00", "endTime": "18:00" }
]

Instruções RIGOROSAS para o JSON:
- "dayOffset": Inteiro de 1 a 7, indicando o dia da semana (ex: 1 = amanhã, 7 = daqui a uma semana).
- "type": DEVE SER ESTRITAMENTE: "aula", "questoes", "simulado" ou "redacao". NUNCA use "revisao", use "questoes".
- "materia": Escolha APENAS entre: "Matemática", "Biologia", "Física", "Química", "História", "Geografia", "Filosofia", "Sociologia", "Linguagens", "Redação" ou "Geral".
- "qnt": Para "questoes" ou "simulado", coloque a quantidade de questões sugerida (ex: 30, 45, 90).
- "startTime" e "endTime": Use o formato HH:MM (ex: 08:00, 14:30). Preencha o meu dia todo de acordo com a carga horária que respondi.
- Crie de 4 a 8 tarefas por dia dependendo do meu tempo livre, priorizando MUITAS questões.
- Retorne APENAS o JSON válido.`;

    const apiKey = localStorage.getItem('gemini_api_key');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }],
                generationConfig: { temperature: 0.7 }
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erro da API do Google: ${response.status}`);
        }
        
        const data = await response.json();
        let aiText = data.candidates[0].content.parts[0].text;
        
        // Limpar possíveis marcações markdown do retorno da IA
        aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        let tasks = JSON.parse(aiText);
        
        if (!Array.isArray(tasks)) {
            throw new Error("Formato inválido retornado pela IA.");
        }
        
        const batch = db.batch();
        const baseDate = new Date();
        
        tasks.forEach(t => {
            const taskDate = new Date(baseDate);
            taskDate.setDate(taskDate.getDate() + (t.dayOffset || 1));
            const dateStr = taskDate.toISOString().split('T')[0];
            
            let plannedTime = 0;
            if(t.startTime && t.endTime) {
                plannedTime = (new Date(`1970-01-01T${t.endTime}:00`) - new Date(`1970-01-01T${t.startTime}:00`)) / 60000;
            }
            
            const docRef = db.collection("tasks").doc();
            batch.set(docRef, {
                userId: auth.currentUser.uid,
                type: t.type,
                materia: t.materia,
                status: 'pending',
                content: t.content || '',
                qnt: t.qnt || 0,
                startTime: t.startTime || '08:00',
                endTime: t.endTime || '09:00',
                plannedTime: plannedTime > 0 ? plannedTime : 60,
                reviewed: false,
                date: dateStr,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        await batch.commit();
        
        document.getElementById('ia-loading-card').style.display = 'none';
        document.getElementById('ia-setup-card').style.display = 'block';
        showAlert("✨ Cronograma Mestre gerado com sucesso! Confira sua agenda para a próxima semana.");
        showPage('calendario', document.querySelectorAll('.nav-link')[1]);
        
    } catch (error) {
        console.error("Erro ao gerar cronograma:", error);
        document.getElementById('ia-loading-card').style.display = 'none';
        document.getElementById('ia-setup-card').style.display = 'block';
        showAlert("Houve um erro ao processar com a IA. Verifique sua chave de API e tente novamente. Detalhes: " + error.message);
    }
}

// Chamar checagem de API Key ao carregar
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkIaSetup, 1000);
});
