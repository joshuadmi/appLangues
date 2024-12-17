// Récupération des éléments du DOM pour les utiliser plus tard dans le code.
let welcomeScreen = document.getElementById("welcomeScreen");
let questionsScreen = document.getElementById("questionsScreen");
let resultScreen = document.getElementById("resultScreen");
const progressBar = document.getElementById("progressBar"); // Barre de progression pour afficher l'avancement du quiz.

function Quiz() {
  this.questions = []; // Tableau pour stocker les questions du quiz.
  this.nbCorrects = 0; // Nombre de réponses correctes données par l'utilisateur.
  this.indexCurrentquestion = 0; // Index de la question actuellement affichée.

  // Méthode pour ajouter une question à la liste des questions.
  this.addQuestion = function (question) {
    this.questions.push(question); // Ajoute la question au tableau des questions.
  };

  // Fonction pour mettre à jour la barre de progression en fonction du nombre de questions.
  function updateProgressBar(currentIndex, totalQuestions) {
    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100; // Calcule le pourcentage de progression.
    progressBar.style.width = progressPercentage + "%"; // Applique ce pourcentage à la largeur de la barre de progression.
  }

  // Affiche la question actuelle et met à jour la barre de progression.
  this.showCurrentQuestion = function () {
    if (this.indexCurrentquestion < this.questions.length) {
      // Si des questions restent à afficher
      updateProgressBar(this.indexCurrentquestion, this.questions.length); // Met à jour la barre de progression.

      // Affiche la question avec son numéro et le nombre total de questions.
      this.questions[this.indexCurrentquestion].getElement(
        this.indexCurrentquestion + 1,
        this.questions.length
      );
    } else {
      // Si toutes les questions ont été répondues, affiche les résultats.
      questionsScreen.style.display = "none"; // Cache l'écran des questions.
      resultScreen.style.display = "block"; // Affiche l'écran des résultats.

      // Crée et affiche le texte des résultats.
      let resultText = document.createElement("h2");
      resultText.textContent = `Vous avez obtenu ${this.nbCorrects} sur ${this.questions.length} !`;
      resultScreen.append(resultText); // Ajoute le texte des résultats dans l'écran des résultats.
    }
  };
}

// Définition de la classe Question qui représente une question du quiz.
function Question(title, answers, answerCorrect) {                           //Fonction constructor
  this.title = title; 
  this.answers = answers; 
  this.answerCorrect = answerCorrect; 
  
  // Méthode pour afficher la question et ses réponses dans l'écran des questions.
  this.getElement = function (indexQuestion, nbrQuestions) {
    questionsScreen.textContent = ""; // Efface le contenu précédent.

    // Crée un élément pour afficher le numéro de la question et le total des questions.
    let questionNbr = document.createElement("h2");
    questionNbr.classList.add("quiz-subtitle");
    questionNbr.textContent = `Question ${indexQuestion} sur ${nbrQuestions}`;
    questionsScreen.append(questionNbr); // Ajoute cet élément à l'écran des questions.

    // Crée un élément pour afficher le titre de la question.
    let questionTitle = document.createElement("h3");
    questionTitle.textContent = this.title;
    questionsScreen.append(questionTitle); // Ajoute cet élément à l'écran des questions.

    // Crée un élément pour afficher la liste des réponses.
    let questionAnswers = document.createElement("ul");
    questionAnswers.classList.add("question-answers");

    // Pour chaque réponse, crée un élément de liste et l'ajoute à la liste des réponses.
    this.answers.forEach((answer, index) => {
      let elAnswer = document.createElement("li");
      elAnswer.classList.add("answer"); // Ajoute une classe CSS pour styliser l'élément.
      elAnswer.textContent = answer; // Affiche le texte de la réponse.
      elAnswer.id = index + 1; // Donne à chaque réponse un ID unique basé sur son index.
      elAnswer.addEventListener("click", this.checkAnswer); // Ajoute un événement pour vérifier la réponse lorsqu'elle est cliquée.
      questionAnswers.append(elAnswer); // Ajoute l'élément de réponse à la liste.
    });

    questionsScreen.append(questionAnswers); // Ajoute la liste des réponses à l'écran des questions.
  };

  // Vérifie si la réponse sélectionnée par l'utilisateur est correcte.
  this.checkAnswer = (event) => {
    let answerSelected = event.target.id; // Récupère l'ID de la réponse sélectionnée par l'utilisateur.

    // Si la réponse est correcte, applique une classe CSS pour la colorer en vert.
    if (this.isCorrectAnswer(answerSelected)) {
      event.target.classList.add("answer-correct");
      quiz.nbCorrects++; // Incrémente le nombre de réponses correctes.
    } else {
      // Si la réponse est incorrecte, applique une classe CSS pour la colorer en rouge.
      event.target.classList.add("answer-wrong");
      let elRightAnswer = document.getElementById(this.answerCorrect); // Trouve la réponse correcte.
      elRightAnswer.classList.add("answer-correct"); // Colorie la réponse correcte en vert.
    }

    // Empêche l'utilisateur de cliquer plusieurs fois sur les réponses.
    let answers = document.querySelectorAll(".answer");
    answers.forEach((answer) =>
      answer.removeEventListener("click", this.checkAnswer)
    );

    // Après un délai d'une seconde, passe à la question suivante.
    setTimeout(() => {
      quiz.indexCurrentquestion++; // Passe à la question suivante.
      quiz.showCurrentQuestion(); // Affiche la question suivante.
    }, 1000);
  };

  // Vérifie si la réponse sélectionnée par l'utilisateur est correcte.
  this.isCorrectAnswer = function (answerUser) {
    return parseInt(answerUser) === this.answerCorrect; // Retourne vrai si la réponse de l'utilisateur est correcte.
  };
}

// Initialisation du quiz.
let quiz = new Quiz();

// Définition des questions du quiz.
let question1 = new Question(
  "Traduisez: Eu sou estrangeira.",
  [
    "Je suis étrangère",
    "J'aime les films",
    "S'il te plaît",
    "Tu es un étranger",
  ],
  1 // La réponse correcte est la première.
);
quiz.addQuestion(question1); // Ajoute cette question au quiz.

let question2 = new Question(
  "Traduisez: 'Por favor, esta é a rua Paulista?'",
  [
    "S'il vous plaît, voudriez-vous un Paulista?",
    "S'il vous plaît, est-ce la rue Paulista ?",
    "Bonjour, êtes-vous Paulista?",
    "Quelle heure est-il, s'il vous plaît?",
  ],
  2 // La réponse correcte est la deuxième.
);
quiz.addQuestion(question2); // Ajoute cette question au quiz.

let question3 = new Question(
  "Complétez la phrase: Bonjour. Je suis italienne.",
  [
    "Boa noite. Eu vou dormir.",
    "Bom dia. Vamos para Italia.",
    "Bom dia. Tudo bem?",
    "Bom dia. Eu sou italiana.",
  ],
  4 // La réponse correcte est la quatrième.
);
quiz.addQuestion(question3); // Ajoute cette question au quiz.

let question4 = new Question(
  "Esta é _____ mãe. Ela chama-se Ana. ",
  ["a minha", "meu", "nosso", "me"],
  1
);
quiz.addQuestion(question4);

let question5 = new Question(
  "'Ananas' se traduit par: ",
  ["Amora", "Satanas", "Abacaxi", "Maracuja"],
  3
);
quiz.addQuestion(question5);

let question6 = new Question(
  "O João ganhou a corrida. Ele correu _____ rápido do que o Tiago. ",
  ["menos", "tanto", "tão", "mais"],
  4
);
quiz.addQuestion(question6);
let question7 = new Question(
  "Os exames eram _____. ",
  ["dificiles", "difis", "defonces", "difíceis"],
  4
);
quiz.addQuestion(question7);

let question8 = new Question(
  "Aquele rapaz está sempre a gritar. Gritar significa: _____. ",
  ["berrar", "chorar", "cantar", "pular"],
  1
);
quiz.addQuestion(question8);
let question9 = new Question(
  "Você tem ___________. ",
  ["um mensagem", "uma mensagem", "uns mensagens", "umas messages"],
  2
);
quiz.addQuestion(question9);

let question10 = new Question(
  "Tens_________? Que horas são?",
  ["um montre", "uma relogia", "um relogio", "umas coisas"],
  3
);
quiz.addQuestion(question10);

// Fonction pour démarrer le quiz lorsque l'utilisateur clique sur le bouton.
function showQuestion1() {
  welcomeScreen.style.display = "none"; // Cache l'écran d'accueil.
  questionsScreen.style.display = "block"; // Affiche l'écran des questions.
  quiz.showCurrentQuestion(); // Affiche la première question.
}

// Ajoute un événement de clic sur le bouton "commencer" pour démarrer le quiz.
let quizBtn = document.getElementById("quizBtn");
quizBtn.addEventListener("click", showQuestion1);
