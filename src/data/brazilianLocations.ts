export interface State {
  name: string;
  code: string;
  cities: string[];
}

export const brazilianStates: State[] = [
  {
    name: "Acre",
    code: "AC",
    cities: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"]
  },
  {
    name: "Alagoas",
    code: "AL",
    cities: ["Maceió", "Arapiraca", "Rio Largo", "Palmeira dos Índios", "União dos Palmares"]
  },
  {
    name: "Amapá",
    code: "AP",
    cities: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Porto Grande"]
  },
  {
    name: "Amazonas",
    code: "AM",
    cities: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"]
  },
  {
    name: "Bahia",
    code: "BA",
    cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas", "Jequié", "Teixeira de Freitas"]
  },
  {
    name: "Ceará",
    code: "CE",
    cities: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá"]
  },
  {
    name: "Distrito Federal",
    code: "DF",
    cities: ["Brasília", "Ceilândia", "Taguatinga", "Samambaia", "Planaltina", "Sobradinho", "Gama", "Santa Maria", "São Sebastião", "Recanto das Emas"]
  },
  {
    name: "Espírito Santo",
    code: "ES",
    cities: ["Vitória", "Vila Velha", "Cariacica", "Serra", "Cachoeiro de Itapemirim", "Linhares", "São Mateus", "Colatina", "Guarapari", "Aracruz"]
  },
  {
    name: "Goiás",
    code: "GO",
    cities: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama"]
  },
  {
    name: "Maranhão",
    code: "MA",
    cities: ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas"]
  },
  {
    name: "Mato Grosso",
    code: "MT",
    cities: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Sorriso", "Lucas do Rio Verde", "Barra do Garças", "Primavera do Leste"]
  },
  {
    name: "Mato Grosso do Sul",
    code: "MS",
    cities: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí", "Nova Andradina", "Sidrolândia", "Paranaíba", "Maracaju"]
  },
  {
    name: "Minas Gerais",
    code: "MG",
    cities: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga", "Sete Lagoas", "Divinópolis", "Santa Luzia", "Ibirité", "Poços de Caldas"]
  },
  {
    name: "Pará",
    code: "PA",
    cities: ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal", "Abaetetuba", "Cametá", "Marituba", "Bragança"]
  },
  {
    name: "Paraíba",
    code: "PB",
    cities: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cajazeiras", "Guarabira", "Mamanguape", "Cabedelo"]
  },
  {
    name: "Paraná",
    code: "PR",
    cities: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais", "Campo Largo"]
  },
  {
    name: "Pernambuco",
    code: "PE",
    cities: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão"]
  },
  {
    name: "Piauí",
    code: "PI",
    cities: ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior", "Barras", "União", "Altos", "Pedro II"]
  },
  {
    name: "Rio de Janeiro",
    code: "RJ",
    cities: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "São João de Meriti", "Campos dos Goytacazes", "Petrópolis", "Volta Redonda", "Magé", "Macaé", "Itaboraí", "Cabo Frio", "Angra dos Reis"]
  },
  {
    name: "Rio Grande do Norte",
    code: "RN",
    cities: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Caicó", "Açu", "Currais Novos", "Nova Cruz"]
  },
  {
    name: "Rio Grande do Sul",
    code: "RS",
    cities: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul"]
  },
  {
    name: "Rondônia",
    code: "RO",
    cities: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura", "Guajará-Mirim", "Jaru", "Ouro Preto do Oeste", "Buritis"]
  },
  {
    name: "Roraima",
    code: "RR",
    cities: ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí", "Bonfim", "Cantá", "Normandia", "Pacaraima", "Iracema"]
  },
  {
    name: "Santa Catarina",
    code: "SC",
    cities: ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí", "Lages", "Jaraguá do Sul", "Palhoça", "Balneário Camboriú", "Brusque", "Tubarão", "São Bento do Sul", "Caçador"]
  },
  {
    name: "São Paulo",
    code: "SP",
    cities: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba", "Mauá", "São José dos Campos", "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba", "Piracicaba", "Bauru", "Itaquaquecetuba", "Franca", "São Vicente", "Praia Grande", "Guarujá", "Santos", "Taubaté", "Suzano", "Sumaré", "Barueri", "Embu das Artes", "São Caetano do Sul", "Indaiatuba", "Cotia", "Americana", "Araraquara", "Jacareí", "Hortolândia", "Rio Claro", "Araçatuba", "Santa Bárbara d'Oeste", "Ferraz de Vasconcelos", "Francisco Morato", "Itapecerica da Serra", "Itu", "Pindamonhangaba", "Bragança Paulista", "Atibaia", "Araras", "Cubatão", "Valinhos", "Sertãozinho", "Jandira", "Birigui", "Caraguatatuba", "Ribeirão Pires", "Catanduva", "Botucatu", "Guaratinguetá", "Poá", "Franco da Rocha", "Mogi Guaçu", "Jaú", "Limeira", "Várzea Paulista", "Itapetininga", "Embu-Guaçu", "Taboão da Serra", "Suzano", "Votorantim", "Arujá", "Salto", "Penápolis", "Votuporanga", "Barretos", "Itatiba", "Carapicuíba", "Itapevi", "Marília", "Guararema", "Matão", "Ferraz de Vasconcelos", "Caieiras", "Mairiporã", "Cajamar", "Piraju", "Lins", "Bebedouro", "Jaboticabal", "Assis", "Ituverava", "Lençóis Paulista", "Ourinhos", "Adamantina", "Pirassununga", "Tupã", "Mirassol", "Avaré", "Cruzeiro", "Capivari", "Porto Feliz", "Itararé", "Registro", "Tatuí", "Votuporanga", "São Roque", "Mococa", "Pederneiras", "São Manuel", "Agudos", "Pompéia", "Garça", "Cândido Mota", "Pirajuí", "Conchas", "Rancharia", "Pederneiras", "Brodowski", "Cravinhos", "Ribeirão Bonito", "Dourado", "Igarapava", "Miguelópolis", "Orlândia", "Sales Oliveira", "São Joaquim da Barra", "Guará", "Ipuã", "Morro Agudo", "Nuporanga", "Patrocínio Paulista", "Restinga", "Ribeirão Corrente", "Rifaina", "Sales", "Santo Antônio da Alegria", "São José da Bela Vista", "Serra Azul", "Serrana", "Sertãozinho", "Taquaral", "Terra Roxa", "Viradouro"]
  },
  {
    name: "Sergipe",
    code: "SE",
    cities: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "São Cristóvão", "Estância", "Tobias Barreto", "Simão Dias", "Propriá", "Barra dos Coqueiros"]
  },
  {
    name: "Tocantins",
    code: "TO",
    cities: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins", "Guaraí", "Tocantinópolis", "Miracema do Tocantins", "Formoso do Araguaia"]
  }
];

export const getAllCities = (): string[] => {
  return brazilianStates.flatMap(state => state.cities);
};

export const getCitiesByState = (stateName: string): string[] => {
  const state = brazilianStates.find(s => s.name === stateName);
  return state ? state.cities : [];
};

export const getStates = (): string[] => {
  return brazilianStates.map(state => state.name);
};

