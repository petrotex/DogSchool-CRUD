export function ValidarCPF(cpf) {
    // Verifica que o campo seja apenas inteiros
    if (/[^0-9.\-]/.test(cpf)) {
      return false; 
    }
  
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Limite de 11 Dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Verificar Décimo Dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let d10 = 11 - (sum % 11);
    d10 = (d10 >= 10) ? 0 : d10;
  
    // Verificar Décimo Primeiro Dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let d11 = 11 - (sum % 11);
    d11 = (d11 >= 10) ? 0 : d11;
  
    // Verifica se os dígitos verificadores calculados correspondem aos fornecidos
    return (d10 === parseInt(cpf[9]) && d11 === parseInt(cpf[10]));
  }
  