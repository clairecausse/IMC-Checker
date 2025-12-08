export function sendVerificationEmail(email, token) {
  const url = `http://localhost:3001/verify/${token}`;

  console.log("------ EMAIL DE VERIFICATION ------");
  console.log("À :", email);
  console.log("Clique ici pour valider ton compte :", url);
  console.log("-----------------------------------");
}
