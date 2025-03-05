// pages/about.js
import Image from 'next/image';

export default function About() {
  const usuarios = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      bio: 'Desarrollador web apasionado por el código y la innovación.',
      foto: '/images/juan.jpg', // Coloca la imagen en la carpeta public/images
    },
    {
      id: 2,
      nombre: 'María López',
      bio: 'Diseñadora creativa enfocada en la experiencia del usuario.',
      foto: '/images/maria.jpg',
    },
    {
      id: 3,
      nombre: 'Carlos García',
      bio: 'Especialista en marketing digital y estrategias de crecimiento.',
      foto: '/images/carlos.jpg',
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sobre Nosotros</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center', width: '300px' }}>
            <Image 
              src={usuario.foto} 
              alt={usuario.nombre} 
              width={200} 
              height={200} 
              style={{ borderRadius: '50%' }}
            />
            <h2>{usuario.nombre}</h2>
            <p>{usuario.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
