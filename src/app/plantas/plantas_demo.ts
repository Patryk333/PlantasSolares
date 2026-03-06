import { Planta } from './planta';

export const PLANTAS_DEMO: Planta[] = [
  {
    id: 1,
    created_at: 1704067200,
    nom: 'Planta Solar Almería I',
    ubicacio: {
      latitude: 36.8340,
      longitude: -2.4637
    },
    capacitat: 150,
    usuario: 'admin',
    foto: 'almeria1.jpg',
    favorite: true
  },
  {
    id: 2,
    created_at: 1704153600,
    nom: 'Planta Solar Sevilla Norte',
    ubicacio: {
      latitude: 37.3891,
      longitude: -5.9845
    },
    capacitat: 220,
    usuario: 'admin',
    foto: 'sevilla-norte.jpg',
    favorite: false
  },
  {
    id: 3,
    created_at: 1704240000,
    nom: 'Planta Solar Murcia Sur',
    ubicacio: {
      latitude: 37.9922,
      longitude: -1.1307
    },
    capacitat: 180,
    usuario: 'operador1',
    foto: 'murcia.jpg',
    favorite:false
  },
  {
    id: 4,
    created_at: 1704326400,
    nom: 'Planta Solar Valencia Este',
    ubicacio: {
      latitude: 39.4699,
      longitude: -0.3763
    },
    capacitat: 95,
    usuario: 'operador2',
    foto: 'valencia-este.png',
    favorite: true
  },
  {
    id: 5,
    created_at: 1704412800,
    nom: 'Planta Solar Zaragoza Central',
    ubicacio: {
      latitude: 41.6488,
      longitude: -0.8891
    },
    capacitat: 130,
    usuario: 'admin',
    foto: 'zaragoza.jpg',
    favorite: false
  }
];
