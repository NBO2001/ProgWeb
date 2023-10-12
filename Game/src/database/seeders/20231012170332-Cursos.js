'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cursos', [
      {
        sigla: "EM01",
        nome: "Enfermagem (Diurno)",
        descricao: "Descrição inventada para Enfermagem (Diurno)",
        areaId: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH19",
        nome: "Música (Matutino)",
        descricao: "Descrição inventada para Música (Matutino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH28",
        nome: "Música (Noturno)",
        descricao: "Descrição inventada para Música (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH30",
        nome: "Artes Visuais (Matutino)",
        descricao: "Descrição inventada para Artes Visuais (Matutino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH31",
        nome: "Artes Visuais (Noturno)",
        descricao: "Descrição inventada para Artes Visuais (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH57",
        nome: "Artes Visuais (EAD - Polo UaB Itacoatiara)",
        descricao: "Descrição inventada para Artes Visuais (EAD - Polo UaB Itacoatiara)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH58",
        nome: "Artes Visuais (EAD - Polo UaB Santa Isabel do Rio Negro)",
        descricao: "Descrição inventada para Artes Visuais (EAD - Polo UaB Santa Isabel do Rio Negro)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH59",
        nome: "Artes Visuais (EAD - Polo UaB Tefé)",
        descricao: "Descrição inventada para Artes Visuais (EAD - Polo UaB Tefé)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FG01",
        nome: "Agronomia (Diurno)",
        descricao: "Descrição inventada para Agronomia (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FG02",
        nome: "Engenharia Florestal (Diurno)",
        descricao: "Descrição inventada para Engenharia Florestal (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FG03",
        nome: "Engenharia de Pesca (Diurno)",
        descricao: "Descrição inventada para Engenharia de Pesca (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FG04",
        nome: "Zootecnia (Diurno)",
        descricao: "Descrição inventada para Zootecnia (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FG05",
        nome: "Engenharia de Alimentos (Diurno)",
        descricao: "Descrição inventada para Engenharia de Alimentos (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FS01",
        nome: "Farmácia (Diurno)",
        descricao: "Descrição inventada para Farmácia (Diurno)",
        areaId: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FD01",
        nome: "Direito (Diurno)",
        descricao: "Descrição inventada para Direito (Diurno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FD02",
        nome: "Direito (Noturno)",
        descricao: "Descrição inventada para Direito (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IB02",
        nome: "Educação Física(Diurno)",
        descricao: "Descrição inventada para Educação Física (Diurno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IB06",
        nome: "Educação Física - Promoção em Saúde e Lazer (Vespertino)",
        descricao: "Descrição inventada para Educação Física - Promoção em Saúde e Lazer (Vespertino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IB07",
        nome: "Educação Física - Treinamento Esportivo (Vespertino)",
        descricao: "Descrição inventada para Educação Física - Treinamento Esportivo (Vespertino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IB08",
        nome: "Fisioterapia (Integral)",
        descricao: "Descrição inventada para Fisioterapia (Integral)",
        areaId: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IB16",
        nome: "Educação Física (Noturno)",
        descricao: "Descrição inventada para Educação Física (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA01",
        nome: "Administração (Matutino)",
        descricao: "Descrição inventada para Administração (Matutino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA02",
        nome: "Administração (Noturno)",
        descricao: "Descrição inventada para Administração (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA03",
        nome: "Ciências Contábeis (Vespertino)",
        descricao: "Descrição inventada para Ciências Contábeis (Vespertino)",
        areaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA04",
        nome: "Ciências Contábeis (Noturno)",
        descricao: "Descrição inventada para Ciências Contábeis (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA05",
        nome: "Ciências Econômicas (Matutino)",
        descricao: "Descrição inventada para Ciências Econômicas (Matutino)",
        areaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FA06",
        nome: "Ciências Econômicas (Noturno)",
        descricao: "Descrição inventada para Ciências Econômicas (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IE08",
        nome: "Ciência da Computação (Diurno)",
        descricao: "Descrição inventada para Ciência da Computação (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH01",
        nome: "Biblioteconomia (Matutino)",
        descricao: "Descrição inventada para Biblioteconomia (Matutino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH12",
        nome: "Comunicação Social - Relações Públicas (Diurno)",
        descricao: "Descrição inventada para Comunicação Social - Relações Públicas (Diurno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH25",
        nome: "Arquivologia (Noturno)",
        descricao: "Descrição inventada para Arquivologia (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH27",
        nome: "Comunicação Social - Jornalismo (Diurno)",
        descricao: "Descrição inventada para Comunicação Social - Jornalismo (Diurno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH13",
        nome: "Letras - Língua e Literatura Portuguesa (Noturno)",
        descricao: "Descrição inventada para Letras - Língua e Literatura Portuguesa (Noturno)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH15",
        nome: "Letras - Língua e Literatura Inglesa (Vespertino)",
        descricao: "Descrição inventada para Letras - Língua e Literatura Inglesa (Vespertino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "IH16",
        nome: "Letras - Língua e Literatura Francesa (Vespertino)",
        descricao: "Descrição inventada para Letras - Língua e Literatura Francesa (Vespertino)",
        areaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT02-ET",
        nome: "Engenharia Elétrica - Eletrotécnica (Diurno)",
        descricao: "Descrição inventada para Engenharia Elétrica - Eletrotécnica (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT02-T",
        nome: "Engenharia Elétrica - Telecomunicações (Diurno)",
        descricao: "Descrição inventada para Engenharia Elétrica - Telecomunicações (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT05",
        nome: "Engenharia da Computação (Diurno)",
        descricao: "Descrição inventada para Engenharia da Computação (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT06",
        nome: "Engenharia de Produção (Vesp./Noturno)",
        descricao: "Descrição inventada para Engenharia de Produção (Vesp./Noturno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT07",
        nome: "Design (Diurno)",
        descricao: "Descrição inventada para Design (Diurno)",
        areaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT08",
        nome: "Engenharia de Materiais (Diurno)",
        descricao: "Descrição inventada para Engenharia de Materiais (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT09",
        nome: "Engenharia Mecânica (Diurno)",
        descricao: "Descrição inventada para Engenharia Mecânica (Diurno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT10",
        nome: "Arquitetura e Urbanismo (Vesp./Noturno)",
        descricao: "Descrição inventada para Arquitetura e Urbanismo (Vesp./Noturno)",
        areaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT11",
        nome: "Engenharia de Petróleo e Gás (Vesp./Noturno)",
        descricao: "Descrição inventada para Engenharia de Petróleo e Gás (Vesp./Noturno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: "FT12",
        nome: "Engenharia Química (Vesp./Noturno)",
        descricao: "Descrição inventada para Engenharia Química (Vesp./Noturno)",
        areaId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cursos', null, {});
  }
};
