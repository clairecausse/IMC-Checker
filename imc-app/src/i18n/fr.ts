export default {
  nav: {
    home: "Accueil",
    calculator: "Calculateur",
    history: "Historique",
    about: "À propos",
    profile: "Profil",
    login: "Se connecter",
    logout: "Se déconnecter",
  },

  home: {
    title: "Bienvenue sur IMC Checker",
    description: "Calculez facilement votre indice de masse corporelle.",
    partnersTitle: "Nos partenaires",
    infoTitle: "Qu'est-ce que l'IMC ?",
  },

  calculator: {
    title: "Calculateur IMC",
    weight: "Poids",
    height: "Taille",

    unit: "Unité",
    unitKg: "kg",
    unitCm: "cm",
    unitLbs: "lbs",
    unitInch: "inch",
    units: {
      metric: "kg / cm",
      imperial: "lbs / inch",
    },

    calculate: "Calculer",
    reset: "Réinitialiser",

    cooldown:
      "Vous avez déjà calculé votre IMC pour aujourd’hui, revenez demain !",

    buttons: {
      history: "Voir l'historique",
      edit: "Modifier",
    },

    result: {
      title: "Résultat",
      imc: "IMC",
      category: "Catégorie",
      advice: "Conseil",
    },

    errors: {
      loadLast: "Impossible de charger le dernier résultat.",
      calculate:
        "Erreur lors du calcul. Vérifiez les valeurs saisies et réessayez.",
    },
  },

  infoImc: {
    title: "Comment l'IMC est calculé :",
    description:
      "L'Indice de Masse Corporelle (IMC) est calculé en divisant le poids d'une personne en kilogrammes par le carré de sa taille en mètres.",
    link: "Qu'est-ce que l'IMC ?",
  },

  history: {
    title: "Historique",
    empty: "Aucune entrée pour l'instant",
    emptyHint:
      "Commencez à calculer votre IMC pour voir votre historique !",
    delete: "Supprimer",
    total: "Total des calculs :",
    noData: "Aucune donnée pour cette période.",
    period: {
      last30days: "30 jours",
      last3months: "3 mois",
      last1year: "1 an",
      all: "Tout",
    },
    chart: {
      label: "Évolution IMC",
      title: "Évolution IMC",
      yAxis: "IMC",
      xAxis: "Date",
    },
  },

  auth: {
    loginTitle: "Connexion",
    signupTitle: "Créer un compte",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    logout: "Se déconnecter",

    createAccount: "Créer un compte",
    submit: "Valider",
    cancel: "Annuler",
    forgot: "Mot de passe oublié ?",

    noAccount: "Pas de compte ?",
    alreadyAccount: "Déjà un compte ?",
    transferData: "Transférer mes données sauvegardées",

    loading: {
      login: "Connexion...",
      register: "Création...",
    },

    errors: {
      invalidLogin: "Email ou mot de passe incorrect",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      register: "Impossible de créer le compte",
    },

    confirmEmail: {
      title: "📧 Vérifiez vos emails",
      text:
        "Un lien de validation a été envoyé à votre adresse email. Vous pourrez ensuite vous connecter.",
      back: "Retour à la connexion",
    },
  },

  profile: {
    title: "Profil",
    hello: "Bonjour !",
    notConnected:
      "Connectez-vous pour sauvegarder vos données et les retrouver plus tard.",
    loginAction: "Se connecter / Créer un compte",
    historyTitle: "Mon historique IMC",
    deleteAccount: "Supprimer mon compte",
    errors: {
      delete: "Erreur lors de la suppression du compte",
    },
  },

  modal: {
    close: "Fermer",
    confirm: "Confirmer",
  },

  settings: {
    title: "Paramètres",
    language: "Langue",
    appearance: "Apparence",
  },

  rgpd: {
    title: "Confidentialité",
    body:
      "Nous stockons des données limitées pour fournir le service. Consultez notre politique de confidentialité.",
  },

  rgpdInfo: {
    title: "🔒 Traitement des données (RGPD)",
    intro:
      "Les données que vous saisissez (taille, poids) sont utilisées uniquement pour calculer votre IMC et afficher votre historique de calculs sur ce navigateur.",
    data: {
      title: "Quelles données ?",
      heightWeight: "Taille et poids saisis dans le formulaire d’IMC",
      results: "Résultats d’IMC affichés dans l’historique",
    },
    processing: {
      title: "Comment sont-elles traitées ?",
      client:
        "Les calculs sont effectués côté client (dans votre navigateur).",
      noServer: "Aucune donnée n’est envoyée à un serveur externe.",
      delete:
        "L’historique peut être supprimé manuellement via l’interface (bouton poubelle).",
    },
    consent: {
      title: "Consentement",
      text:
        "Avant chaque calcul, l’utilisateur doit cocher une case de consentement dans le formulaire d’IMC indiquant qu’il accepte l’utilisation de ses données pour ce calcul.",
    },
  },

  common: {
    minutes: "minute(s)",
    logoAlt: "Logo",
  },

  errors: {
    required: "Ce champ est requis",
    invalidEmail: "Veuillez saisir un email valide",
    server: "Erreur serveur, veuillez réessayer plus tard",
  },

bmiCategory: {
  underweight: {
    label: "Insuffisance pondérale",
    description:
      "L’insuffisance pondérale correspond à un poids inférieur à la norme par rapport à la taille. Cela signifie que l’indice de masse corporelle est en dessous de 18,5.",
  },
  normal: {
    label: "Corpulence normale",
    description:
      "La corpulence normale correspond à un poids considéré comme adéquat par rapport à la taille. L’IMC se situe entre 18,5 et 25.",
  },
  overweight: {
    label: "Surpoids",
    description:
      "Le surpoids indique un IMC supérieur à la normale, situé entre 25 et 30. Cela signifie que le poids dépasse la fourchette recommandée pour la taille.",
  },
  obese: {
    label: "Obésité",
    description:
      "L’obésité correspond à un IMC compris entre 30 et 50. Elle indique une accumulation de masse grasse plus importante que la normale.",
  },
  morbidObesity: {
    label: "Obésité morbide",
    description:
      "L’obésité morbide correspond à un IMC supérieur à 50. Elle représente un niveau très élevé d'accumulation de masse grasse.",
  },
},

};
