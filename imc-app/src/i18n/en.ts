export default {
  nav: {
    home: "Home",
    calculator: "Calculator",
    history: "History",
    about: "About",
    profile: "Profile",
    login: "Log in",
    logout: "Log out",
  },

  home: {
    title: "Welcome to IMC Checker",
    description: "Easily calculate your Body Mass Index.",
    partnersTitle: "Our partners",
    infoTitle: "What is BMI?",
  },

  calculator: {
    title: "BMI Calculator",
    weight: "Weight",
    height: "Height",

    unit: "Unit",
    unitKg: "kg",
    unitCm: "cm",
    unitLbs: "lbs",
    unitInch: "inch",
    units: {
      metric: "kg / cm",
      imperial: "lbs / inch",
    },

    calculate: "Calculate",
    reset: "Reset",

    cooldown: "You already calculated your BMI today. Come back tomorrow!",

    buttons: {
      history: "View history",
      edit: "Edit",
    },

    result: {
      title: "Result",
      imc: "BMI",
      category: "Category",
      advice: "Advice",
    },

    errors: {
      loadLast: "Unable to load the last result.",
      calculate:
        "An error occurred during calculation. Please check your inputs and try again.",
    },
  },

  infoImc: {
    title: "How BMI is calculated:",
    description:
      "Body Mass Index (BMI) is calculated by dividing a person's weight in kilograms by the square of their height in meters.",
    link: "What is BMI?",
  },

  history: {
    title: "History",
    empty: "No entries yet",
    emptyHint: "Start calculating your BMI to see your history!",
    delete: "Delete",
    total: "Total calculations:",
    noData: "No data for this period.",
    period: {
      last30days: "30 days",
      last3months: "3 months",
      last1year: "1 year",
      all: "All",
    },
    chart: {
      label: "BMI evolution",
      title: "BMI evolution",
      yAxis: "BMI",
      xAxis: "Date",
    },
    export: {
    pdf: "Export as PDF",
    json: "Export as JSON",
    },
  },

  auth: {
    loginTitle: "Log in",
    signupTitle: "Create an account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    logout: "Log out",

    createAccount: "Create account",
    submit: "Submit",
    cancel: "Cancel",
    forgot: "Forgot password?",

    noAccount: "No account?",
    alreadyAccount: "Already have an account?",
    transferData: "Transfer my saved data",

    loading: {
      login: "Logging in...",
      register: "Creating account...",
    },

    errors: {
      invalidLogin: "Invalid email or password",
      passwordMismatch: "Passwords do not match",
      register: "Unable to create account",
    },

    confirmEmail: {
      title: "📧 Check your emails",
      text:
        "A validation link has been sent to your email address. You will then be able to log in.",
      back: "Back to login",
    },
  },

  profile: {
    title: "Profile",
    hello: "Hello!",
    notConnected:
      "Log in to save your data and retrieve it later.",
    loginAction: "Log in / Create an account",
    historyTitle: "My BMI history",
    deleteAccount: "Delete account",
    errors: {
      delete: "Error while deleting account",
    },
  },

  modal: {
    close: "Close",
    confirm: "Confirm",
  },

  settings: {
    title: "Settings",
    language: "Language",
    appearance: "Appearance",
  },

  rgpd: {
    title: "Privacy",
    body:
      "We store limited data to provide the service. See our privacy policy.",
  },

  rgpdInfo: {
    title: "🔒 Data processing (GDPR)",
    intro:
      "The data you enter (height, weight) is used only to calculate your BMI and display your calculation history in this browser.",
    data: {
      title: "What data?",
      heightWeight: "Height and weight entered in the BMI form",
      results: "BMI results displayed in the history",
    },
    processing: {
      title: "How is it processed?",
      client: "Calculations are performed on the client side (in your browser).",
      noServer: "No data is sent to an external server.",
      delete:
        "The history can be manually deleted via the interface (trash button).",
    },
    consent: {
      title: "Consent",
      text:
        "Before each calculation, the user must check a consent box in the BMI form indicating acceptance of the use of their data for this calculation.",
    },
  },

  common: {
    minutes: "minute(s)",
    logoAlt: "Logo",
  },

  errors: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    server: "Server error, please try again later",
  },

  bmiCategory: {
  underweight: {
    label: "Underweight",
    description:
      "Underweight corresponds to a body weight below the normal range for height. This means a BMI below 18.5.",
  },
  normal: {
    label: "Normal weight",
    description:
      "Normal weight corresponds to a body weight considered appropriate for height. BMI is between 18.5 and 25.",
  },
  overweight: {
    label: "Overweight",
    description:
      "Overweight indicates a BMI above the normal range, between 25 and 30.",
  },
  obese: {
    label: "Obesity",
    description:
      "Obesity corresponds to a BMI between 30 and 50 and indicates an excessive accumulation of body fat.",
  },
  morbidObesity: {
    label: "Morbid obesity",
    description:
      "Morbid obesity corresponds to a BMI above 50 and represents a very high level of body fat accumulation.",
  },

},


};
