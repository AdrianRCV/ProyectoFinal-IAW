import Image from 'next/image';
import styles from "../nosotros/page.module.css"

export default function About() {
  const usuarios = [
    {
      id: 1,
      nombre: 'ADRIAN CAMPOS VARGAS',
      bio: 'Desarrollador backend apasionado por la lógica y el rendimiento del servidor.',
      foto: '/adrian_github.png',
    },
    {
      id: 2,
      nombre: 'DAVID CHALAN',
      bio: 'Ingeniero backend especializado en arquitectura y escalabilidad de sistemas.',
      foto: '/david_github.png',
    },
    {
      id: 3,
      nombre: 'RAUL ALEXANDRU CALIN ROSIU',
      bio: 'Desarrollador frontend creativo, enfocado en la experiencia del usuario y la interactividad.',
      foto: '/raul_github.png',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Nosotros</h1>
      <div className={styles.usersContainer}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} className={styles.card}>
            <Image
              src={usuario.foto}
              alt={usuario.nombre}
              width={150}
              height={150}
              className={styles.avatar}
            />
            <h2 className={styles.name}>{usuario.nombre}</h2>
            <p className={styles.bio}>{usuario.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




