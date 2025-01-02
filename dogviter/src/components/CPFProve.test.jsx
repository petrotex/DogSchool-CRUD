import { describe, it, expect } from 'vitest';
import { ValidarCPF } from './CPFProve';

describe('isValidCPF', () => {
  it('Teste de CPF Válido', () => {
    expect(ValidarCPF('123.456.789-09')).toBe(true);
    expect(ValidarCPF('111.444.777-35')).toBe(true);
  });

  it('Teste de CPF Inválido (Cálculo deu Errado)', () => {
    expect(ValidarCPF('123.456.789-00')).toBe(false);
    expect(ValidarCPF('111.444.777-10')).toBe(false); 
  });

  it('Teste de CPF Inválido (com Strings)', () => {
    expect(ValidarCPF('abc.def.ghi-jk')).toBe(false);
    expect(ValidarCPF('111.444.777-35abc')).toBe(false);
  });

  it('Teste de CPF Inválido (mais de 11 números)', () => {
    expect(ValidarCPF('123456789')).toBe(false);
    expect(ValidarCPF('123456789012')).toBe(false);
  });

  it('Teste de CPF Inválido (números iguais)', () => {
    expect(ValidarCPF('111.111.111-11')).toBe(false);
    expect(ValidarCPF('222.222.222-22')).toBe(false);
  });
});